import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AttendanceController } from './attendance.controller';
import { AttendanceValidation } from './attendance.validation';

const router = express.Router();

router.post(
  '/',
  auth,
  validateRequest(AttendanceValidation.createAttendanceValidation),
  AttendanceController.createAttendance
);

router.get(
  '/',
  auth,
  validateRequest(AttendanceValidation.getAttendanceValidation),
  AttendanceController.getAllAttendance
);

router.get(
  '/:id',
  auth,
  AttendanceController.getAttendanceById
);

router.put(
  '/:id',
  auth,
  validateRequest(AttendanceValidation.updateAttendanceValidation),
  AttendanceController.updateAttendance
);

router.delete(
  '/:id',
  auth,
  AttendanceController.deleteAttendance
);

export const AttendanceRoutes = router;