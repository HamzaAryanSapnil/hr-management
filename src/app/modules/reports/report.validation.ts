import { z } from 'zod';

const getAttendanceReportValidation = z.object({
  query: z.object({
    month: z.string().regex(/^\d{4}-\d{2}$/, 'Month must be in YYYY-MM format'),
    employee_id: z.string().optional(),
  }),
});

export const ReportValidation = {
  getAttendanceReportValidation,
};