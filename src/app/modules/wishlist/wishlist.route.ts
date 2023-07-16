import express from 'express';
import auth from '../../middlewares/auth';
import { WishListController } from './wishlist.controller';

const router = express.Router();

router.post('/add', auth(), WishListController.addWishList);
router.delete('/:id', auth(), WishListController.deleteWishList);
router.get('/', auth(), WishListController.getWishList);

export const WishListRoutes = router;
