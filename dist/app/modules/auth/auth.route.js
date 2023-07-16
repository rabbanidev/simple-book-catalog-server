"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequestHandler_1 = __importDefault(require("../../middlewares/validateRequestHandler"));
const auth_validation_1 = require("./auth.validation");
const auth_controller_1 = require("./auth.controller");
const router = express_1.default.Router();
router.post('/signup', (0, validateRequestHandler_1.default)(auth_validation_1.AuthValidation.createUserZodSchema), auth_controller_1.AuthController.signup);
router.post('/login', (0, validateRequestHandler_1.default)(auth_validation_1.AuthValidation.loginUserZodSchema), auth_controller_1.AuthController.login);
exports.AuthRoutes = router;
