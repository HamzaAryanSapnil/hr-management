"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadToCloudinary = void 0;
const cloudinary_1 = require("cloudinary");
const env_1 = require("../config/env");
const AppError_1 = __importDefault(require("../app/errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
if (env_1.env.CLOUDINARY_CLOUD_NAME && env_1.env.CLOUDINARY_API_KEY && env_1.env.CLOUDINARY_API_SECRET) {
    cloudinary_1.v2.config({
        cloud_name: env_1.env.CLOUDINARY_CLOUD_NAME,
        api_key: env_1.env.CLOUDINARY_API_KEY,
        api_secret: env_1.env.CLOUDINARY_API_SECRET,
    });
}
const uploadToCloudinary = async (buffer, folder = 'hr-management') => {
    if (!env_1.env.CLOUDINARY_CLOUD_NAME || !env_1.env.CLOUDINARY_API_KEY || !env_1.env.CLOUDINARY_API_SECRET) {
        throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Cloudinary configuration is missing. Please configure Cloudinary credentials.');
    }
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary_1.v2.uploader.upload_stream({
            resource_type: 'image',
            folder,
            transformation: [
                { width: 500, height: 500, crop: 'limit' },
                { quality: 'auto' },
                { fetch_format: 'auto' },
            ],
            allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif', 'bmp', 'tiff', 'svg'],
        }, (error, result) => {
            if (error) {
                console.error('Cloudinary upload error:', error);
                reject(new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, `Failed to upload image to cloud storage: ${error.message}`));
            }
            else if (!result || !result.secure_url) {
                reject(new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Failed to get image URL from cloud storage'));
            }
            else {
                resolve(result.secure_url);
            }
        });
        uploadStream.end(buffer);
    });
};
exports.uploadToCloudinary = uploadToCloudinary;
exports.default = cloudinary_1.v2;
//# sourceMappingURL=cloudinary.js.map