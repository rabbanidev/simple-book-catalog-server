/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import { IUser, UserModel } from './user.interface';
import config from '../../../config';

const userSchema = new Schema<IUser, UserModel>(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform(doc, ret) {
        delete ret.password;
      },
    },
  }
);

//User exit in database
userSchema.statics.userExit = async function (
  email: string
): Promise<Partial<IUser> | null> {
  return await User.findOne({ email }, { password: 1 });
};

// Match password
userSchema.statics.matchPassword = async function (
  textPassword: string,
  hashPassword: string
): Promise<boolean> {
  return await bcrypt.compare(textPassword, hashPassword);
};

// Password hash useing pre hook middleware
userSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );

  next();
});

const User = model<IUser, UserModel>('User', userSchema);

export default User;
