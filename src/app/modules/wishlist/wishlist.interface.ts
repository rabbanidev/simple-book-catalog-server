import { Model, Schema } from 'mongoose';
import { IBook } from '../book/book.interface';
import { IUser } from '../user/user.interface';

export type IWishList = {
  book: Schema.Types.ObjectId | IBook;
  user: Schema.Types.ObjectId | IUser;
};

export type WishListModel = Model<IWishList, Record<string, unknown>>;
