import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { ReadingListService } from './readingList.service';
import { IReadingList } from './readingList.interface';

const addReadingList = catchAsync(async (req: Request, res: Response) => {
  const result = await ReadingListService.addReadingList(req.body, req.user);

  sendResponse<IReadingList>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Book added successfully!',
    data: result,
  });
});

const getReadingList = catchAsync(async (req: Request, res: Response) => {
  const result = await ReadingListService.getReadingList(req.user);

  sendResponse<IReadingList[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reading list retrive successfully!',
    data: result,
  });
});

const deleteReadingList = catchAsync(async (req: Request, res: Response) => {
  const result = await ReadingListService.deleteReadingList(
    req.params.id,
    req.user
  );

  sendResponse<IReadingList>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reading list item delete successfully!',
    data: result,
  });
});

const finishedReadingList = catchAsync(async (req: Request, res: Response) => {
  const result = await ReadingListService.finishedReadingList(
    req.params.id,
    req.user
  );

  sendResponse<IReadingList>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reading list item  update successfully!',
    data: result,
  });
});

export const ReadingListController = {
  addReadingList,
  getReadingList,
  deleteReadingList,
  finishedReadingList,
};
