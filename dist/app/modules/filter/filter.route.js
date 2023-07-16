"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterRoutes = void 0;
const express_1 = __importDefault(require("express"));
const filter_controller_1 = require("./filter.controller");
const router = express_1.default.Router();
router.get('/books/genres', filter_controller_1.FilterController.getFilterByGenre);
router.get('/books/years', filter_controller_1.FilterController.getFilterByYear);
exports.FilterRoutes = router;
