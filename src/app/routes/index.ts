import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { EmployeeRoutes } from '../modules/employees/employee.routes';
import { AttendanceRoutes } from '../modules/attendance/attendance.routes';
import { ReportRoutes } from '../modules/reports/report.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/employees',
    route: EmployeeRoutes,
  },
  {
    path: '/attendance',
    route: AttendanceRoutes,
  },
  {
    path: '/reports',
    route: ReportRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;