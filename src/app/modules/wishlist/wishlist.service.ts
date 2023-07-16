import { JwtPayload } from 'jsonwebtoken';
import { IWishList } from './wishlist.interface';
import WishList from './wishlist.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { IBook } from '../book/book.interface';

const addWishList = async (
  payload: IBook,
  user: JwtPayload
): Promise<IWishList | null> => {
  const exitWishlist = await WishList.findOne({
    book: payload.id,
    user: user.userId,
  });

  if (exitWishlist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Already added!');
  }

  const result = (
    await (
      await WishList.create({ book: payload.id, user: user.userId })
    ).populate('book')
  ).populate('user');

  return result;
};

const getWishList = async (user: JwtPayload): Promise<IWishList[] | null> => {
  const exitWishlist = await WishList.find({
    user: user.userId,
  })
    .populate('book')
    .populate('user');

  return exitWishlist;
};

const deleteWishList = async (
  id: string,
  user: JwtPayload
): Promise<IWishList | null> => {
  const result = await WishList.findOneAndDelete({
    _id: id,
    user: user.userId,
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Wishlist item not found!');
  }

  return result;
};

export const WishListService = {
  addWishList,
  getWishList,
  deleteWishList,
};
