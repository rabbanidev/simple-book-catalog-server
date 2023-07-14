import { JwtPayload } from 'jsonwebtoken';
import { IReview } from './review.interface';
import { exitReview, exitUser } from './review.utils';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import Review from './review.model';

const createReview = async (
  id: string,
  payload: IReview,
  user: JwtPayload
): Promise<IReview | null> => {
  const isExitUser = await exitUser(user.userId);
  if (isExitUser) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Access denied!');
  }

  const isExitReview = await exitReview(user.userId);
  if (isExitReview) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Already reviewed!');
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

const getReviews = async (id: string): Promise<IReview[] | null> => {
  const result = await Review.find({
    book: id,
  })
    .populate('user')
    .populate({
      path: 'book',
      populate: 'user',
    });

  return result;
};

export const ReviewService = {
  createReview,
  getReviews,
};
