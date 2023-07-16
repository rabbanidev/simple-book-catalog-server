import express from 'express';
import auth from '../../middlewares/auth';
import { UserController } from './user.controller';

const router = express.Router();

router.get('/my-profile', auth(), UserController.getMyProfile);

export const UserRoutes = router;
