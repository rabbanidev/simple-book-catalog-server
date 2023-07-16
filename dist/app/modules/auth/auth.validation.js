"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const createUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({
            required_error: 'Email is required!',
        })
            .email({
            message: 'Email is invalid!',
        }),
        password: zod_1.z
            .string({
            required_error: 'Password is required!',
        })
            .min(6)
            .max(12),
    }),
});
const loginUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({
            required_error: 'Email is required!',
        })
            .email({
            message: 'Email is invalid!',
        }),
        password: zod_1.z
            .string({
            required_error: 'Password is required!',
        })
            .min(6)
            .max(12),
    }),
});
exports.AuthValidation = {
    createUserZodSchema,
    loginUserZodSchema,
};
