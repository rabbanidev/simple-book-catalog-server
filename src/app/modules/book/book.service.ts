import { JwtPayload } from 'jsonwebtoken';
import { IBook, IBookFilters } from './book.interface';
import Book from './book.model';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { paginationHelpers } from '../../../helper/paginationHelpers';
import { bookSearchableFields } from './book.constant';

const createBook = async (
  payload: IBook,
  user: JwtPayload
): Promise<IBook | null> => {
  payload.publicationDate = new Date(payload.publicationDate).toISOString();
  payload.genre = payload.genre.toLowerCase();
  payload.user = user.userId;

  const result = (await Book.create(payload)).populate('user');
  return result;
};

const getBooks = async (
  filters: IBookFilters,
  paginationOptions: IPaginationOptions
) => {
  const { searchTerm, publicationYear, ...filtersData } = filters;
  const { page, limit, skip, sortConditions } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  // Search implementation
  if (searchTerm) {
    andConditions.push({
      $or: bookSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  // Filter implementation
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // publicationYear implemenation
  if (publicationYear) {
    andConditions.push({
      $expr: {
        $eq: [{ $substr: ['$publicationDate', 0, 4] }, publicationYear],
      },
    });
  }

  const whereCondition =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Book.find(whereCondition)
    .populate('user')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Book.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const BookService = {
  createBook,
  getBooks,
};
