import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { BookService } from './book.service';
import { IBook } from './book.interface';

const createBook = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.createBook(req.body, req.user);

  sendResponse<IBook>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Book created successfully!',
    data: result,
  });
});

export const BookController = {
  createBook,
};
