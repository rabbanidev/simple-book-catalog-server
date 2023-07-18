import { IBook } from '../book/book.interface';
import Book from '../book/book.model';
import Review from './review.model';

export const getBook = async (id: string): Promise<Partial<IBook> | null> => {
  const book = await Book.findOne({ user: id }, { user: 1 }).lean();
  return book;
};

export const exitReview = async (
  bookId: string,
  userId: string
): Promise<boolean> => {
  const reviews = await Review.find(
    { user: userId },
    { user: 1, book: 1 }
  ).lean();
  const isReviewed = reviews.some((review) => String(review.book) === bookId);

  return isReviewed;
};
