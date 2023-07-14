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

router.patch(
  '/:id',
  auth(),
  validateRequestHandler(BookValidation.editBookZodSchema),
  BookController.editBook
);

router.delete('/:id', auth(), BookController.deleteBook);

router.get('/', BookController.getBooks);
router.get('/:id', BookController.getBook);

export const BookRoutes = router;
