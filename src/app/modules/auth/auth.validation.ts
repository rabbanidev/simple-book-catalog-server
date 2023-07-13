import { z } from 'zod';

const createUserZodSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email is required!',
      })
      .email({
        message: 'Email is invalid!',
      }),
    password: z
      .string({
        required_error: 'Password is required!',
      })
      .min(6)
      .max(12),
  }),
});

const loginUserZodSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email is required!',
      })
      .email({
        message: 'Email is invalid!',
      }),
    password: z
      .string({
        required_error: 'Password is required!',
      })
      .min(6)
      .max(12),
  }),
});

export const AuthValidation = {
  createUserZodSchema,
  loginUserZodSchema,
};
