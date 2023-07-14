import express from 'express';
import validateRequestHandler from '../../middlewares/validateRequestHandler';
import auth from '../../middlewares/auth';
import { ReviewController } from './review.controller';
import { ReviewValidation } from './review.validation';

const router = express.Router();

router.post(
  '/:id',
  auth(),
  validateRequestHandler(ReviewValidation.createReviewZodSchema),
  ReviewController.createReview
);

export const ReviewRoutes = router;
