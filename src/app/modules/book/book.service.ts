import { JwtPayload } from 'jsonwebtoken';
import { IBook } from './book.interface';
import Book from './book.model';

const createBook = async (
  payload: IBook,
  user: JwtPayload
): Promise<IBook | null> => {
  payload.user = user.userId;
  const result = (await Book.create(payload)).populate('user');
  return result;
};

export const BookService = {
  createBook,
};
