import { z } from 'zod';

const createReviewZodSchema = z.object({
  body: z.object({
    text: z.string({
      required_error: 'Review text is required!',
    }),
  }),
});

export const ReviewValidation = {
  createReviewZodSchema,
};
