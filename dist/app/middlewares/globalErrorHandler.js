"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const env_1 = require("../../config/env");
const AppError_1 = __importDefault(require("../errors/AppError"));
const handleZodError_1 = __importDefault(require("../errors/handleZodError"));
const handleDatabaseError = (error) => {
    let statusCode = 500;
    let message = 'Database error occurred';
    if (error.code === '23505') {
        statusCode = 409;
        message = 'Duplicate entry. This record already exists.';
    }
    else if (error.code === '23503') {
        statusCode = 400;
        message = 'Invalid reference. The related record does not exist.';
    }
    else if (error.code === '23502') {
        statusCode = 400;
        message = 'Required field is missing.';
    }
    else if (error.code === '42703') {
        statusCode = 500;
        message = 'Database query error: Invalid column name.';
    }
    else if (error.code === '42P01') {
        statusCode = 500;
        message = 'Database query error: Table not found.';
    }
    else if (error.message && error.message.includes('GROUP BY')) {
        statusCode = 500;
        message = 'Database query error: Invalid aggregation query.';
    }
    return {
        statusCode,
        message,
        errorMessages: [
            {
                path: '',
                message: env_1.env.NODE_ENV === 'development' ? error.message : message,
            },
        ],
    };
};
const globalErrorHandler = (error, req, res, next) => {
    let statusCode = 500;
    let message = 'Something went wrong!';
    let errorMessages = [];
    if (error instanceof zod_1.ZodError) {
        const simplifiedError = (0, handleZodError_1.default)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    }
    else if (error instanceof AppError_1.default) {
        statusCode = error?.statusCode;
        message = error.message;
        errorMessages = [
            {
                path: '',
                message: error?.message,
            },
        ];
    }
    else if (error.code || (error.message && error.message.includes('GROUP BY'))) {
        const dbError = handleDatabaseError(error);
        statusCode = dbError.statusCode;
        message = dbError.message;
        errorMessages = dbError.errorMessages;
    }
    else if (error instanceof Error) {
        message = error?.message;
        errorMessages = [
            {
                path: '',
                message: error?.message,
            },
        ];
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorMessages,
        stack: env_1.env.NODE_ENV === 'development' ? error?.stack : null,
    });
};
exports.default = globalErrorHandler;
//# sourceMappingURL=globalErrorHandler.js.map