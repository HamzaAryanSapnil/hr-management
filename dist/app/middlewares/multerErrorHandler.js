"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerErrorHandler = void 0;
const multer_1 = __importDefault(require("multer"));
const http_status_1 = __importDefault(require("http-status"));
const multer_2 = require("../../config/multer");
const multerErrorHandler = (err, req, res, next) => {
    if (err instanceof multer_1.default.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(http_status_1.default.BAD_REQUEST).json({
                success: false,
                message: `File size too large. Maximum allowed size is ${multer_2.FILE_UPLOAD_CONFIG.MAX_SIZE_MB}MB.`,
                errorMessages: [
                    {
                        path: 'file',
                        message: `File size exceeds ${multer_2.FILE_UPLOAD_CONFIG.MAX_SIZE_MB}MB limit. Please upload a smaller file.`,
                    },
                ],
            });
        }
        if (err.code === 'LIMIT_UNEXPECTED_FILE') {
            return res.status(http_status_1.default.BAD_REQUEST).json({
                success: false,
                message: 'Unexpected field name for file upload.',
                errorMessages: [
                    {
                        path: 'file',
                        message: 'Invalid field name. Use "photo" for file upload.',
                    },
                ],
            });
        }
        return res.status(http_status_1.default.BAD_REQUEST).json({
            success: false,
            message: 'File upload error',
            errorMessages: [
                {
                    path: 'file',
                    message: err.message,
                },
            ],
        });
    }
    if (err.message && (err.message.includes('Invalid file') || err.message.includes('Allowed formats'))) {
        return res.status(http_status_1.default.BAD_REQUEST).json({
            success: false,
            message: 'Invalid file type',
            errorMessages: [
                {
                    path: 'file',
                    message: `Only image files are allowed. Supported formats: ${multer_2.FILE_UPLOAD_CONFIG.ALLOWED_FORMATS_TEXT}. Maximum size: ${multer_2.FILE_UPLOAD_CONFIG.MAX_SIZE_MB}MB.`,
                },
            ],
        });
    }
    next(err);
};
exports.multerErrorHandler = multerErrorHandler;
//# sourceMappingURL=multerErrorHandler.js.map