import { JwtPayload } from 'jsonwebtoken';
import { IUser } from './user.interface';
import User from './user.model';

const getMyProfile = async (user: JwtPayload): Promise<IUser | null> => {
  const result = await User.findById(user.userId);
  return result;
};

export const UserService = {
  getMyProfile,
};
