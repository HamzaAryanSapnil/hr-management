import { z } from 'zod';

const createAttendanceValidation = z.object({
  body: z.object({
    employee_id: z.number().positive('Employee ID must be positive'),
    date: z.string().transform((str) => new Date(str)),
    check_in_time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/, 'Invalid time format (HH:MM:SS)'),
  }),
});

const updateAttendanceValidation = z.object({
  body: z.object({
    check_in_time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/, 'Invalid time format (HH:MM:SS)').optional(),
  }),
});

const getAttendanceValidation = z.object({
  query: z.object({
    employee_id: z.string().optional(),
    from: z.string().optional(),
    to: z.string().optional(),
    page: z.string().optional(),
    limit: z.string().optional(),
    sortBy: z.string().optional(),
    sortOrder: z.enum(['asc', 'desc']).optional(),
  }),
});

export const AttendanceValidation = {
  createAttendanceValidation,
  updateAttendanceValidation,
  getAttendanceValidation,
};