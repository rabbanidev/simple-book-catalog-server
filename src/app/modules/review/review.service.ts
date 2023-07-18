import { JwtPayload } from 'jsonwebtoken';
import { IReview } from './review.interface';
import { exitReview, getBook } from './review.utils';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import Review from './review.model';

const createReview = async (
  id: string,
  payload: IReview,
  user: JwtPayload
): Promise<IReview | null> => {
  const book = await getBook(user.userId);
  if (book?.user?.toString() === user.userId.toString()) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "You can't review because you create this book!"
    );
  }

  const isExitReview = await exitReview(id, user.userId);
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
    })
    .sort({ createdAt: 'desc' });

  return result;
};

export const ReviewService = {
  createReview,
  getReviews,
};
