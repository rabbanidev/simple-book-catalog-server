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
exports.exitReview = exports.sameUser = void 0;
const book_model_1 = __importDefault(require("../book/book.model"));
const review_model_1 = __importDefault(require("./review.model"));
const sameUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_model_1.default.findOne({ user: id }).lean();
    return book ? true : false;
});
exports.sameUser = sameUser;
const exitReview = (bookId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const reviews = yield review_model_1.default.find({ user: userId }, { user: 1, book: 1 }).lean();
    const isReviewed = reviews.some((review) => String(review.book) === bookId);
    return isReviewed ? true : false;
});
exports.exitReview = exitReview;
