import { JwtPayload } from 'jsonwebtoken';
import { IBook, IBookFilters } from './book.interface';
import Book from './book.model';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { paginationHelpers } from '../../../helper/paginationHelpers';
import { bookSearchableFields } from './book.constant';
import { IGenericResponse } from '../../../interfaces/common';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

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

const editBook = async (
  payload: Partial<IBook>,
  id: string,
  user: JwtPayload
): Promise<IBook | null> => {
  const exitBook = await Book.findOne({ _id: id, user: user.userId });
  if (!exitBook) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found!');
  }

  Object.assign(exitBook, payload);

  if (payload?.publicationDate) {
    exitBook.publicationDate = new Date(payload.publicationDate).toISOString();
  }
  if (payload?.genre) {
    exitBook.genre = payload.genre.toLowerCase();
  }

  const result = (await exitBook.save()).populate('user');
  return result;
};

const deleteBook = async (
  id: string,
  user: JwtPayload
): Promise<IBook | null> => {
  const result = await Book.findOneAndDelete({ _id: id, user: user.userId });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found!');
  }
  return result;
};

const getBooks = async (
  filters: IBookFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IBook[]>> => {
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

const getBook = async (id: string): Promise<IBook> => {
  const result = await Book.findById(id).populate('user');
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found!');
  }

  return result;
};

export const BookService = {
  createBook,
  editBook,
  deleteBook,
  getBooks,
  getBook,
};
