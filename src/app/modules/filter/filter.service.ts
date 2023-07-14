import Book from '../book/book.model';

const getFilterByGenre = async (): Promise<string[]> => {
  const result = await Book.find({}, { genre: 1, _id: 0 }).lean();
  const genres: string[] = [
    ...new Set(result.map((item) => item.genre.toLowerCase())),
  ];
  return genres;
};

const getFilterByYear = async (): Promise<number[]> => {
  const result = await Book.find({}, { publicationDate: 1 }).lean();

  const years: number[] = [
    ...new Set(
      result.map((item) => new Date(item.publicationDate).getFullYear())
    ),
  ];

  return years;
};

export const FilterService = {
  getFilterByGenre,
  getFilterByYear,
};
