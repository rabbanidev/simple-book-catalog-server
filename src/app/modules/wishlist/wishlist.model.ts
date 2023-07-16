import { Schema, model } from 'mongoose';
import { IWishList, WishListModel } from './wishlist.interface';

const wishlistSchema = new Schema<IWishList, WishListModel>(
  {
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

const WishList = model<IWishList, WishListModel>('WishList', wishlistSchema);

export default WishList;
