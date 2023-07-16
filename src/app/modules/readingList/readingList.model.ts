import { Schema, model } from 'mongoose';
import { IReadingList, ReadingListModel } from './readingList.interface';

const readinglistSchema = new Schema<IReadingList, ReadingListModel>(
  {
    finshedReading: {
      type: Boolean,
      default: false,
    },
    book: {
      type: Schema.Types.ObjectId,
      ref: 'Book',
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const ReadingList = model<IReadingList, ReadingListModel>(
  'ReadingList',
  readinglistSchema
);

export default ReadingList;
