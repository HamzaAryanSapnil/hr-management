import { z } from 'zod';

const createEmployeeValidation = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    age: z.coerce.number().int().positive('Age must be a positive integer'),
    designation: z.string().min(1, 'Designation is required'),
    hiring_date: z.string().transform((str) => new Date(str)),
    date_of_birth: z.string().transform((str) => new Date(str)),
    salary: z.coerce.number().positive('Salary must be positive'),
  }),
});

const updateEmployeeValidation = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required').optional(),
    age: z.coerce.number().int().positive('Age must be a positive integer').optional(),
    designation: z.string().min(1, 'Designation is required').optional(),
    hiring_date: z.string().transform((str) => new Date(str)).optional(),
    date_of_birth: z.string().transform((str) => new Date(str)).optional(),
    salary: z.coerce.number().positive('Salary must be positive').optional(),
  }),
});

const getEmployeesValidation = z.object({
  query: z.object({
    search: z.string().optional(),
    designation: z.string().optional(),
    page: z.string().optional(),
    limit: z.string().optional(),
    sortBy: z.string().optional(),
    sortOrder: z.enum(['asc', 'desc']).optional(),
  }),
});

export const EmployeeValidation = {
  createEmployeeValidation,
  updateEmployeeValidation,
  getEmployeesValidation,
};