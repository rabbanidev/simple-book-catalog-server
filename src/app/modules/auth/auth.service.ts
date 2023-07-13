import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IUser } from '../user/user.interface';
import User from '../user/user.model';
import { ILoginResponse } from './auth.interface';
import { jwtHelpers } from '../../../helper/jwtHelpers';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';

const signup = async (payload: IUser): Promise<ILoginResponse> => {
  const user = await User.userExit(payload.email);
  if (user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Already register user!');
  }

  const result = await User.create(payload);

  // Generate access and refresh token
  const refreshToken = jwtHelpers.createToken(
    { userId: result._id },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );
  const accessToken = jwtHelpers.createToken(
    { userId: result._id },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

const login = async (payload: IUser): Promise<ILoginResponse> => {
  const user = await User.userExit(payload.email);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found!');
  }

  // Match password
  const isMatchPassword = await User.matchPassword(
    payload.password,
    user.password as string
  );
  if (!isMatchPassword) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Password doesn't match!");
  }

  // Generate access and refresh token
  const refreshToken = jwtHelpers.createToken(
    { userId: user._id },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );
  const accessToken = jwtHelpers.createToken(
    { userId: user._id },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

// const logout = async (payload: IUser): Promise<ILoginResponse> => {};

export const AuthService = {
  signup,
  login,
};
