/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type IUser = {
  _id?: string;
  email: string;
  password: string;
};

export type UserModel = {
  userExit(email: string): Promise<Partial<IUser> | null>;
  matchPassword(textPassword: string, hashPassword: string): Promise<boolean>;
} & Model<IUser>;
