import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { WishListService } from './wishlist.service';
import { IWishList } from './wishlist.interface';

const addWishList = catchAsync(async (req: Request, res: Response) => {
  const result = await WishListService.addWishList(req.body, req.user);

  sendResponse<IWishList>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Book added successfully!',
    data: result,
  });
});

const getWishList = catchAsync(async (req: Request, res: Response) => {
  const result = await WishListService.getWishList(req.user);

  sendResponse<IWishList[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Wishlit retrive successfully!',
    data: result,
  });
});

const deleteWishList = catchAsync(async (req: Request, res: Response) => {
  const result = await WishListService.deleteWishList(req.params.id, req.user);

  sendResponse<IWishList>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Wishlit item delete successfully!',
    data: result,
  });
});

export const WishListController = {
  addWishList,
  getWishList,
  deleteWishList,
};
