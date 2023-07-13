import express from 'express';
import validateRequestHandler from '../../middlewares/validateRequestHandler';
import { AuthValidation } from './auth.validation';
import { AuthController } from './auth.controller';

const router = express.Router();

router.post(
  '/signup',
  validateRequestHandler(AuthValidation.createUserZodSchema),
  AuthController.signup
);

router.post(
  '/login',
  validateRequestHandler(AuthValidation.loginUserZodSchema),
  AuthController.login
);

export const AuthRoutes = router;
