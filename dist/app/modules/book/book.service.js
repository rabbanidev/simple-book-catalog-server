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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const book_model_1 = __importDefault(require("./book.model"));
const paginationHelpers_1 = require("../../../helper/paginationHelpers");
const book_constant_1 = require("./book.constant");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const createBook = (payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    payload.publicationDate = new Date(payload.publicationDate).toISOString();
    payload.genre = payload.genre.toLowerCase();
    payload.user = user.userId;
    const result = (yield book_model_1.default.create(payload)).populate('user');
    return result;
});
const editBook = (payload, id, user) => __awaiter(void 0, void 0, void 0, function* () {
    const exitBook = yield book_model_1.default.findOne({ _id: id, user: user.userId });
    if (!exitBook) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Book not found!');
    }
    Object.assign(exitBook, payload);
    if (payload === null || payload === void 0 ? void 0 : payload.publicationDate) {
        exitBook.publicationDate = new Date(payload.publicationDate).toISOString();
    }
    if (payload === null || payload === void 0 ? void 0 : payload.genre) {
        exitBook.genre = payload.genre.toLowerCase();
    }
    const result = (yield exitBook.save()).populate('user');
    return result;
});
const deleteBook = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.default.findOneAndDelete({ _id: id, user: user.userId });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Book not found!');
    }
    return result;
});
const getBooks = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm, publicationYear } = filters, filtersData = __rest(filters, ["searchTerm", "publicationYear"]);
    const { page, limit, skip, sortConditions } = paginationHelpers_1.paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];
    // Search implementation
    if (searchTerm) {
        andConditions.push({
            $or: book_constant_1.bookSearchableFields.map((field) => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    // Filter implementation
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    // publicationYear implemenation
    if (publicationYear) {
        andConditions.push({
            $expr: {
                $eq: [{ $substr: ['$publicationDate', 0, 4] }, publicationYear],
            },
        });
    }
    const whereCondition = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield book_model_1.default.find(whereCondition)
        .populate('user')
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield book_model_1.default.countDocuments(whereCondition);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.default.findById(id).populate('user');
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Book not found!');
    }
    return result;
});
exports.BookService = {
    createBook,
    editBook,
    deleteBook,
    getBooks,
    getBook,
};
