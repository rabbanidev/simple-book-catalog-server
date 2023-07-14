import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { FilterService } from './filter.service';

const getFilterByGenre = catchAsync(async (req: Request, res: Response) => {
  const result = await FilterService.getFilterByGenre();

  sendResponse<string[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Genres retrive successfully!',
    data: result,
  });
});

const getFilterByYear = catchAsync(async (req: Request, res: Response) => {
  const result = await FilterService.getFilterByYear();

  sendResponse<number[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Years retrive successfully!',
    data: result,
  });
});

export const FilterController = {
  getFilterByGenre,
  getFilterByYear,
};
