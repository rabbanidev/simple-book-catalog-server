import { JwtPayload } from 'jsonwebtoken';
import { IReview } from './review.interface';
import { checkUser } from './review.utils';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import Review from './review.model';

const createReview = async (
  id: string,
  payload: IReview,
  user: JwtPayload
): Promise<IReview | null> => {
  const isExitUser = await checkUser(user.userId);
  if (isExitUser) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Access denied!');
  }

  const reviewPayload = {
    text: payload.text,
    book: id,
    user: user.userId,
  };
  const result = (
    await (await Review.create(reviewPayload)).populate('user')
  ).populate({
    path: 'book',
    populate: 'user',
  });

  return result;
};

export const ReviewService = {
  createReview,
};
