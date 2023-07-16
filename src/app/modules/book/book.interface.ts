import { Model, Schema } from 'mongoose';
import { IUser } from '../user/user.interface';

export type IBook = {
  id?: string;
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  user: Schema.Types.ObjectId | IUser;
};

export type BookModel = Model<IBook, Record<string, unknown>>;

export type IBookFilters = {
  searchTerm?: string;
  title?: string;
  author?: string;
  genre?: string;
  publicationYear?: string;
};
