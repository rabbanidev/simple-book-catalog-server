import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IReview } from './review.interface';
import { ReviewService } from './review.service';

const createReview = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewService.createReview(
    req.params.id,
    req.body,
    req.user
  );

  sendResponse<IReview>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Review created successfully!',
    data: result,
  });
});

const getReviews = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewService.getReviews(req.params.id);

  sendResponse<IReview[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reviews retrive successfully!',
    data: result,
  });
});

export const ReviewController = {
  createReview,
  getReviews,
};
