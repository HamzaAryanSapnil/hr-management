"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = __importDefault(require("http-status"));
const db_1 = __importDefault(require("../../../config/db"));
const jwt_1 = require("../../../config/jwt");
const AppError_1 = __importDefault(require("../../errors/AppError"));
class AuthService {
    async login(payload) {
        const { email, password } = payload;
        const user = await (0, db_1.default)('hr_users')
            .where({ email })
            .first();
        if (!user) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
        }
        const isPasswordMatched = await bcrypt_1.default.compare(password, user.password_hash);
        if (!isPasswordMatched) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'Password is incorrect');
        }
        const jwtPayload = {
            id: user.id,
            email: user.email,
            name: user.name,
        };
        const token = jwt_1.jwtHelpers.signToken(jwtPayload);
        return {
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            },
        };
    }
}
exports.authService = new AuthService();
//# sourceMappingURL=auth.service.js.map