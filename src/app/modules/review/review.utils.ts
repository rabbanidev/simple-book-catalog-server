import Book from '../book/book.model';

export const checkUser = async (id: string): Promise<boolean> => {
  const book = await Book.findOne({ user: id }).lean();
  return book ? true : false;
};
