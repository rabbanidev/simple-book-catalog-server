import Book from '../book/book.model';
import Review from './review.model';

export const sameUser = async (id: string): Promise<boolean> => {
  const book = await Book.findOne({ user: id }).lean();
  return book ? true : false;
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

  return isReviewed ? true : false;
};
