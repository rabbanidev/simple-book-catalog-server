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
exports.FilterService = void 0;
const book_model_1 = __importDefault(require("../book/book.model"));
const getFilterByGenre = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.default.find({}, { genre: 1, _id: 0 }).lean();
    const genres = [
        ...new Set(result.map((item) => item.genre.toLowerCase())),
    ];
    return genres;
});
const getFilterByYear = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.default.find({}, { publicationDate: 1 }).lean();
    const years = [
        ...new Set(result.map((item) => new Date(item.publicationDate).getFullYear())),
    ];
    return years;
});
exports.FilterService = {
    getFilterByGenre,
    getFilterByYear,
};
