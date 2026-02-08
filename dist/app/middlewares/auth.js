"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const jwt_1 = require("../../config/jwt");
const AppError_1 = __importDefault(require("../errors/AppError"));
const catchAsync_1 = __importDefault(require("../../shared/catchAsync"));
const auth = (0, catchAsync_1.default)(async (req, res, next) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized');
    }
    try {
        const decoded = jwt_1.jwtHelpers.verifyToken(token);
        req.user = decoded;
        next();
    }
    catch (error) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'Invalid token', error.message);
    }
});
exports.default = auth;
//# sourceMappingURL=auth.js.map