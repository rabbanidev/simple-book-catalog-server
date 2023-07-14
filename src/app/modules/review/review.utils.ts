import Book from '../book/book.model';
import Review from './review.model';

export const exitUser = async (id: string): Promise<boolean> => {
  const book = await Book.findOne({ user: id }).lean();
  return book ? true : false;
};

export const exitReview = async (id: string): Promise<boolean> => {
  const review = await Review.findOne({ user: id }).lean();
  return review ? true : false;
};
