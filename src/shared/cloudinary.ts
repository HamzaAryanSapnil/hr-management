
import { v2 as cloudinary } from 'cloudinary';
import { env } from '../config/env';
import AppError from '../app/errors/AppError';
import httpStatus from 'http-status';

if (env.CLOUDINARY_CLOUD_NAME && env.CLOUDINARY_API_KEY && env.CLOUDINARY_API_SECRET) {
  cloudinary.config({
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET,
  });
}

export const uploadToCloudinary = async (
  buffer: Buffer,
  folder: string = 'hr-management'
): Promise<string> => {
  
  if (!env.CLOUDINARY_CLOUD_NAME || !env.CLOUDINARY_API_KEY || !env.CLOUDINARY_API_SECRET) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Cloudinary configuration is missing. Please configure Cloudinary credentials.'
    );
  }

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'image',
        folder,
        transformation: [
          { width: 500, height: 500, crop: 'limit' },
          { quality: 'auto' },
          { fetch_format: 'auto' },
        ],
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif', 'bmp', 'tiff', 'svg'],
      },
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          reject(
            new AppError(
              httpStatus.INTERNAL_SERVER_ERROR,
              `Failed to upload image to cloud storage: ${error.message}`
            )
          );
        } else if (!result || !result.secure_url) {
          reject(
            new AppError(
              httpStatus.INTERNAL_SERVER_ERROR,
              'Failed to get image URL from cloud storage'
            )
          );
        } else {
          resolve(result.secure_url);
        }
      }
    );

    uploadStream.end(buffer);
  });
};

export default cloudinary;