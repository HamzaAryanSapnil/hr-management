/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { jwtHelpers } from '../../config/jwt';
import AppError from '../errors/AppError';
import catchAsync from '../../shared/catchAsync';

const auth = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
  }

  try {
    const decoded = jwtHelpers.verifyToken(token);
    req.user = decoded;
    next();
  } catch (error: any) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid token', error.message);
  }
});

export default auth;