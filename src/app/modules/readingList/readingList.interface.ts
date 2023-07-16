import { Model, Schema } from 'mongoose';
import { IBook } from '../book/book.interface';
import { IUser } from '../user/user.interface';

export type IReadingList = {
  finshedReading: boolean;
  book: Schema.Types.ObjectId | IBook;
  user: Schema.Types.ObjectId | IUser;
};

export type ReadingListModel = Model<IReadingList, Record<string, unknown>>;
