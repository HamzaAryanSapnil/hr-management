/* eslint-disable @typescript-eslint/no-explicit-any */
import multer from 'multer';
import path from 'path';
import { env } from './env';


export const FILE_UPLOAD_CONFIG = {
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

const memoryStorage = multer.memoryStorage();

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, env.UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (FILE_UPLOAD_CONFIG.ALLOWED_FORMATS.includes(file.mimetype)) {
    const ext = path.extname(file.originalname).toLowerCase();
    
    if (FILE_UPLOAD_CONFIG.ALLOWED_EXTENSIONS.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error(`Invalid file extension. Allowed formats: ${FILE_UPLOAD_CONFIG.ALLOWED_FORMATS_TEXT}`));
    }
  } else {
    cb(new Error(`Invalid file type. Allowed formats: ${FILE_UPLOAD_CONFIG.ALLOWED_FORMATS_TEXT}`));
  }
};

export const upload = multer({
  storage: env.NODE_ENV === 'production' ? memoryStorage : diskStorage,
  fileFilter,
  limits: {
    fileSize: FILE_UPLOAD_CONFIG.MAX_SIZE,
    files: 1,
  },
});

export default upload;