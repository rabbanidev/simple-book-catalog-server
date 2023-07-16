"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewService = void 0;
const review_utils_1 = require("./review.utils");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const review_model_1 = __importDefault(require("./review.model"));
const createReview = (id, payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    const isSameUser = yield (0, review_utils_1.sameUser)(user.userId);
    if (isSameUser) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Access denied!');
    }
    const isExitReview = yield (0, review_utils_1.exitReview)(id, user.userId);
    if (isExitReview) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Already reviewed!');
    }
    const reviewPayload = {
        text: payload.text,
        book: id,
        user: user.userId,
    };
    const result = (yield (yield review_model_1.default.create(reviewPayload)).populate('user')).populate({
        path: 'book',
        populate: 'user',
    });
    return result;
});
const getReviews = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_model_1.default.find({
        book: id,
    })
        .populate('user')
        .populate({
        path: 'book',
        populate: 'user',
    })
        .sort({ createdAt: 'desc' });
    return result;
});
exports.ReviewService = {
    createReview,
    getReviews,
};
