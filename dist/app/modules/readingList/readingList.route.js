"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadingListRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const readingList_controller_1 = require("./readingList.controller");
const router = express_1.default.Router();
router.post('/add', (0, auth_1.default)(), readingList_controller_1.ReadingListController.addReadingList);
router.patch('/:id', (0, auth_1.default)(), readingList_controller_1.ReadingListController.finishedReadingList);
router.delete('/:id', (0, auth_1.default)(), readingList_controller_1.ReadingListController.deleteReadingList);
router.get('/', (0, auth_1.default)(), readingList_controller_1.ReadingListController.getReadingList);
exports.ReadingListRoutes = router;
