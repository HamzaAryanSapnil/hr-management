import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { multerErrorHandler } from '../../middlewares/multerErrorHandler';
import upload from '../../../config/multer';
import { EmployeeController } from './employee.controller';
import { EmployeeValidation } from './employee.validation';

const router = express.Router();

router.post(
  '/',
  auth,
  upload.single('photo'),
  multerErrorHandler,
  validateRequest(EmployeeValidation.createEmployeeValidation),
  EmployeeController.createEmployee
);

router.get(
  '/',
  auth,
  validateRequest(EmployeeValidation.getEmployeesValidation),
  EmployeeController.getAllEmployees
);

router.get(
  '/:id',
  auth,
  EmployeeController.getEmployeeById
);

router.put(
  '/:id',
  auth,
  upload.single('photo'),
  multerErrorHandler,
  validateRequest(EmployeeValidation.updateEmployeeValidation),
  EmployeeController.updateEmployee
);

router.delete(
  '/:id',
  auth,
  EmployeeController.deleteEmployee
);

export const EmployeeRoutes = router;