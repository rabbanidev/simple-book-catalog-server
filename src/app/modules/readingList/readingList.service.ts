import { JwtPayload } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { IBook } from '../book/book.interface';
import { IReadingList } from './readingList.interface';
import ReadingList from './readingList.model';

const addReadingList = async (
  payload: IBook,
  user: JwtPayload
): Promise<IReadingList | null> => {
  const exitWishlist = await ReadingList.findOne({
    book: payload.id,
    user: user.userId,
  });

  if (exitWishlist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Already added!');
  }

  const result = (
    await (
      await ReadingList.create({
        finshedReading: false,
        book: payload.id,
        user: user.userId,
      })
    ).populate('book')
  ).populate('user');

  return result;
};

const getReadingList = async (
  user: JwtPayload
): Promise<IReadingList[] | null> => {
  const exitWishlist = await ReadingList.find({
    user: user.userId,
  })
    .populate('book')
    .populate('user');

  return exitWishlist;
};

const deleteReadingList = async (
  id: string,
  user: JwtPayload
): Promise<IReadingList | null> => {
  const result = await ReadingList.findOneAndDelete({
    _id: id,
    user: user.userId,
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Reading list item not found!');
  }

  return result;
};

const finishedReadingList = async (
  id: string,
  user: JwtPayload
): Promise<IReadingList | null> => {
  const result = await ReadingList.findOne({
    _id: id,
    user: user.userId,
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Reading list item not found!');
  }

  result.finshedReading = true;

  const updateResult = await result.save();

  return updateResult;
};

export const ReadingListService = {
  addReadingList,
  getReadingList,
  deleteReadingList,
  finishedReadingList,
};
