import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AuthService } from './auth.service';
import httpStatus from 'http-status';
import config from '../../../config';
import { ILoginResponse } from './auth.interface';

const signup = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.signup(req.body);
  const { refreshToken, ...others } = result;

  // Set refresh token into cookies
  const options = {
    secure: config.node_env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, options);

  sendResponse<ILoginResponse>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User signed up successfully!',
    data: others,
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.login(req.body);
  const { refreshToken, ...others } = result;

  // Set refresh token into cookies
  const options = {
    secure: config.node_env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, options);

  sendResponse<ILoginResponse>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User loggedin successfully!',
    data: others,
  });
});

// const logout = catchAsync(async (req: Request, res: Response) => {
//   const result = await AuthService.logout();

//   sendResponse<null>(res, {
//     statusCode: httpStatus.CREATED,
//     success: true,
//     message: 'User logout successfully!',
//     data: result,
//   });
// });

export const AuthController = {
  signup,
  login,
};
