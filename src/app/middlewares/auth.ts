import { NextFunction, Request, Response } from 'express';
import ApiError from '../../errors/ApiError';
import httpStatus from 'http-status';
import { jwtHelpers } from '../../helper/jwtHelpers';
import config from '../../config';
import { JwtPayload } from 'jsonwebtoken';

const auth = () => async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get token
    const token = req.headers.authorization;
    if (!token) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    // Verify token
    const verifyUser = jwtHelpers.verifyToken(
      token,
      config.jwt.secret as string
    );

    // Set verified user for next middleware
    const { userId } = verifyUser as JwtPayload;
    req.user = { userId };

    next();
  } catch (error) {
    next(error);
  }
};

export default auth;
