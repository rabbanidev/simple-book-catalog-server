import { Model, Schema } from 'mongoose';
import { IBook } from '../book/book.interface';
import { IUser } from '../user/user.interface';

export type IReview = {
  text: string;
  book: Schema.Types.ObjectId | IBook;
  user: Schema.Types.ObjectId | IUser;
};

export type ReviewModel = Model<IReview, Record<string, unknown>>;
