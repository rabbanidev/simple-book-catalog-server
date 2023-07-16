"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequestHandler_1 = __importDefault(require("../../middlewares/validateRequestHandler"));
const book_controller_1 = require("./book.controller");
const book_validation_1 = require("./book.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)(), (0, validateRequestHandler_1.default)(book_validation_1.BookValidation.createBookZodSchema), book_controller_1.BookController.createBook);
router.patch('/:id', (0, auth_1.default)(), (0, validateRequestHandler_1.default)(book_validation_1.BookValidation.editBookZodSchema), book_controller_1.BookController.editBook);
router.delete('/:id', (0, auth_1.default)(), book_controller_1.BookController.deleteBook);
router.get('/', book_controller_1.BookController.getBooks);
router.get('/:id', book_controller_1.BookController.getBook);
exports.BookRoutes = router;
