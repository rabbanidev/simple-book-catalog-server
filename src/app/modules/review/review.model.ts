import { Schema, model } from 'mongoose';
import { ReviewModel, IReview } from './review.interface';

const bookSchema = new Schema<IReview, ReviewModel>(
  {
    text: {
      type: String,
      required: true,
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

const Review = model<IReview, ReviewModel>('Review', bookSchema);

export default Review;
