import { z } from 'zod';

const createBookZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required!',
    }),
    author: z.string({
      required_error: 'Author is required!',
    }),
    genre: z.string({
      required_error: 'Genre is required!',
    }),
    publicationDate: z.string({
      required_error: 'Publication date is required!',
    }),
  }),
});

const editBookZodSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    author: z.string().optional(),
    genre: z.string().optional(),
    publicationDate: z.string().optional(),
  }),
});

export const BookValidation = {
  createBookZodSchema,
  editBookZodSchema,
};
