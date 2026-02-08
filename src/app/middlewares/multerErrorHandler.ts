/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import httpStatus from 'http-status';
import { FILE_UPLOAD_CONFIG } from '../../config/multer';

export const multerErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        message: `File size too large. Maximum allowed size is ${FILE_UPLOAD_CONFIG.MAX_SIZE_MB}MB.`,
        errorMessages: [
          {
            path: 'file',
            message: `File size exceeds ${FILE_UPLOAD_CONFIG.MAX_SIZE_MB}MB limit. Please upload a smaller file.`,
          },
        ],
      });
    }

    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(httpStatus.BAD_REQUEST).json({
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

    return res.status(httpStatus.BAD_REQUEST).json({
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
    return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: 'Invalid file type',
      errorMessages: [
        {
          path: 'file',
          message: `Only image files are allowed. Supported formats: ${FILE_UPLOAD_CONFIG.ALLOWED_FORMATS_TEXT}. Maximum size: ${FILE_UPLOAD_CONFIG.MAX_SIZE_MB}MB.`,
        },
      ],
    });
  }

  next(err);
};
