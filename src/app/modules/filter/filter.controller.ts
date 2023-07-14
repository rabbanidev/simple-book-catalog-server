import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { FilterService } from './filter.service';
import { IGenre, IYear } from './filter.interface';

const getFilterByGenre = catchAsync(async (req: Request, res: Response) => {
  const result = await FilterService.getFilterByGenre();

  sendResponse<IGenre[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Genres retrive successfully!',
    data: result,
  });
});

const getFilterByYear = catchAsync(async (req: Request, res: Response) => {
  const result = await FilterService.getFilterByYear();

  sendResponse<IYear[]>(res, {
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
