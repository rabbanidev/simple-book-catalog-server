import Book from '../book/book.model';
import { IGenre, IYear } from './filter.interface';

const getFilterByGenre = async (): Promise<IGenre[] | []> => {
  const result = await Book.find({}, { genre: 1 }).lean();
  const genres: IGenre[] = result.map((item) => ({
    label: item.title,
    value: item._id.toString(),
  }));

  return genres;
};

const getFilterByYear = async (): Promise<IYear[] | []> => {
  const result = await Book.find({}, { publicationDate: 1 }).lean();

  const years: IYear[] = result.map((item) => ({
    label: new Date(item.publicationDate).getFullYear(),
    value: item._id.toString(),
  }));

  return years;
};

export const FilterService = {
  getFilterByGenre,
  getFilterByYear,
};
