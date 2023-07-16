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
exports.AuthService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_model_1 = __importDefault(require("../user/user.model"));
const jwtHelpers_1 = require("../../../helper/jwtHelpers");
const config_1 = __importDefault(require("../../../config"));
const signup = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.userExit(payload.email);
    if (user) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Already register user!');
    }
    const result = yield user_model_1.default.create(payload);
    // Generate access and refresh token
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ userId: result._id }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ userId: result._id }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return {
        accessToken,
        refreshToken,
    };
});
const login = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.userExit(payload.email);
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found!');
    }
    // Match password
    const isMatchPassword = yield user_model_1.default.matchPassword(payload.password, user.password);
    if (!isMatchPassword) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Password doesn't match!");
    }
    // Generate access and refresh token
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ userId: user._id }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ userId: user._id }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return {
        accessToken,
        refreshToken,
    };
});
// const logout = async (payload: IUser): Promise<ILoginResponse> => {};
exports.AuthService = {
    signup,
    login,
};
