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
exports.ReadingListService = void 0;
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const readingList_model_1 = __importDefault(require("./readingList.model"));
const addReadingList = (payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    const exitWishlist = yield readingList_model_1.default.findOne({
        book: payload.id,
        user: user.userId,
    });
    if (exitWishlist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Already added!');
    }
    const result = (yield (yield readingList_model_1.default.create({
        finshedReading: false,
        book: payload.id,
        user: user.userId,
    })).populate('book')).populate('user');
    return result;
});
const getReadingList = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const exitWishlist = yield readingList_model_1.default.find({
        user: user.userId,
    })
        .populate('book')
        .populate('user');
    return exitWishlist;
});
const deleteReadingList = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield readingList_model_1.default.findOneAndDelete({
        _id: id,
        user: user.userId,
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Reading list item not found!');
    }
    return result;
});
const finishedReadingList = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield readingList_model_1.default.findOne({
        _id: id,
        user: user.userId,
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Reading list item not found!');
    }
    result.finshedReading = true;
    const updateResult = yield result.save();
    return updateResult;
});
exports.ReadingListService = {
    addReadingList,
    getReadingList,
    deleteReadingList,
    finishedReadingList,
};
