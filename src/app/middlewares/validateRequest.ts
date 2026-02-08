import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodEffects } from 'zod';
import catchAsync from '../../shared/catchAsync';

const validateRequest = (schema: AnyZodObject | ZodEffects<AnyZodObject>) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  });

export default validateRequest;