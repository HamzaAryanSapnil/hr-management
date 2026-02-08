/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { env } from '../../config/env';
import AppError from '../errors/AppError';
import handleZodError from '../errors/handleZodError';


const handleDatabaseError = (error: any) => {
  let statusCode = 500;
  let message = 'Database error occurred';
  
  if (error.code === '23505') {
    statusCode = 409;
    message = 'Duplicate entry. This record already exists.';
  } else if (error.code === '23503') {
    statusCode = 400;
    message = 'Invalid reference. The related record does not exist.';
  } else if (error.code === '23502') {
    statusCode = 400;
    message = 'Required field is missing.';
  } else if (error.code === '42703') {
    statusCode = 500;
    message = 'Database query error: Invalid column name.';
  } else if (error.code === '42P01') {
    statusCode = 500;
    message = 'Database query error: Table not found.';
  } else if (error.message && error.message.includes('GROUP BY')) {
    statusCode = 500;
    message = 'Database query error: Invalid aggregation query.';
  }

  return {
    statusCode,
    message,
    errorMessages: [
      {
        path: '',
        message: env.NODE_ENV === 'development' ? error.message : message,
      },
    ],
  };
};

const globalErrorHandler: ErrorRequestHandler = (error, req: Request, res: Response, next: NextFunction) => {
  let statusCode = 500;
  let message = 'Something went wrong!';
  let errorMessages: any[] = [];

  if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof AppError) {
    statusCode = error?.statusCode;
    message = error.message;
    errorMessages = [
      {
        path: '',
        message: error?.message,
      },
    ];
  } else if (error.code || (error.message && error.message.includes('GROUP BY'))) {
    const dbError = handleDatabaseError(error);
    statusCode = dbError.statusCode;
    message = dbError.message;
    errorMessages = dbError.errorMessages;
  } else if (error instanceof Error) {
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
    stack: env.NODE_ENV === 'development' ? error?.stack : null,
  });
};

export default globalErrorHandler;