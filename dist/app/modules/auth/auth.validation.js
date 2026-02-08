"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const loginValidation = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email('Please provide a valid email'),
        password: zod_1.z.string().min(6, 'Password must be at least 6 characters'),
    }),
});
exports.AuthValidation = {
    loginValidation,
};
//# sourceMappingURL=auth.validation.js.map