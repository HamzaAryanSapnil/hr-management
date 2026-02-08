import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ReportController } from './report.controller';
import { ReportValidation } from './report.validation';

const router = express.Router();

router.get(
  '/attendance',
  auth,
  validateRequest(ReportValidation.getAttendanceReportValidation),
  ReportController.getAttendanceReport
);

export const ReportRoutes = router;