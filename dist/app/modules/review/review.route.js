"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequestHandler_1 = __importDefault(require("../../middlewares/validateRequestHandler"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const review_controller_1 = require("./review.controller");
const review_validation_1 = require("./review.validation");
const router = express_1.default.Router();
router.post('/:id', (0, auth_1.default)(), (0, validateRequestHandler_1.default)(review_validation_1.ReviewValidation.createReviewZodSchema), review_controller_1.ReviewController.createReview);
router.get('/:id', review_controller_1.ReviewController.getReviews);
exports.ReviewRoutes = router;
