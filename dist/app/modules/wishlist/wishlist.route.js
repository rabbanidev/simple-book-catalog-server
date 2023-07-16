"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishListRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const wishlist_controller_1 = require("./wishlist.controller");
const router = express_1.default.Router();
router.post('/add', (0, auth_1.default)(), wishlist_controller_1.WishListController.addWishList);
router.delete('/:id', (0, auth_1.default)(), wishlist_controller_1.WishListController.deleteWishList);
router.get('/', (0, auth_1.default)(), wishlist_controller_1.WishListController.getWishList);
exports.WishListRoutes = router;
