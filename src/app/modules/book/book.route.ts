import express from 'express';
import validateRequestHandler from '../../middlewares/validateRequestHandler';
import { BookController } from './book.controller';
import { BookValidation } from './book.validation';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/',
  auth(),
  validateRequestHandler(BookValidation.createBookZodSchema),
  BookController.createBook
);

export const BookRoutes = router;
