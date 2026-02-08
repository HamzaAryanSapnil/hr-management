"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.FILE_UPLOAD_CONFIG = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const env_1 = require("./env");
exports.FILE_UPLOAD_CONFIG = {
    MAX_SIZE: 5 * 1024 * 1024,
    MAX_SIZE_MB: 5,
    ALLOWED_FORMATS: [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/webp',
        'image/gif',
        'image/bmp',
        'image/tiff',
        'image/svg+xml',
    ],
    ALLOWED_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.bmp', '.tiff', '.tif', '.svg'],
    ALLOWED_FORMATS_TEXT: 'JPEG, JPG, PNG, WebP, GIF, BMP, TIFF, SVG',
};
const memoryStorage = multer_1.default.memoryStorage();
const diskStorage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, env_1.env.UPLOAD_DIR);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path_1.default.extname(file.originalname));
    },
});
const fileFilter = (req, file, cb) => {
    if (exports.FILE_UPLOAD_CONFIG.ALLOWED_FORMATS.includes(file.mimetype)) {
        const ext = path_1.default.extname(file.originalname).toLowerCase();
        if (exports.FILE_UPLOAD_CONFIG.ALLOWED_EXTENSIONS.includes(ext)) {
            cb(null, true);
        }
        else {
            cb(new Error(`Invalid file extension. Allowed formats: ${exports.FILE_UPLOAD_CONFIG.ALLOWED_FORMATS_TEXT}`));
        }
    }
    else {
        cb(new Error(`Invalid file type. Allowed formats: ${exports.FILE_UPLOAD_CONFIG.ALLOWED_FORMATS_TEXT}`));
    }
};
exports.upload = (0, multer_1.default)({
    storage: env_1.env.NODE_ENV === 'production' ? memoryStorage : diskStorage,
    fileFilter,
    limits: {
        fileSize: exports.FILE_UPLOAD_CONFIG.MAX_SIZE,
        files: 1,
    },
});
exports.default = exports.upload;
//# sourceMappingURL=multer.js.map