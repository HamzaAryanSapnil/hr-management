"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeValidation = void 0;
const zod_1 = require("zod");
const createEmployeeValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, 'Name is required'),
        age: zod_1.z.coerce.number().int().positive('Age must be a positive integer'),
        designation: zod_1.z.string().min(1, 'Designation is required'),
        hiring_date: zod_1.z.string().transform((str) => new Date(str)),
        date_of_birth: zod_1.z.string().transform((str) => new Date(str)),
        salary: zod_1.z.coerce.number().positive('Salary must be positive'),
    }),
});
const updateEmployeeValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, 'Name is required').optional(),
        age: zod_1.z.coerce.number().int().positive('Age must be a positive integer').optional(),
        designation: zod_1.z.string().min(1, 'Designation is required').optional(),
        hiring_date: zod_1.z.string().transform((str) => new Date(str)).optional(),
        date_of_birth: zod_1.z.string().transform((str) => new Date(str)).optional(),
        salary: zod_1.z.coerce.number().positive('Salary must be positive').optional(),
    }),
});
const getEmployeesValidation = zod_1.z.object({
    query: zod_1.z.object({
        search: zod_1.z.string().optional(),
        designation: zod_1.z.string().optional(),
        page: zod_1.z.string().optional(),
        limit: zod_1.z.string().optional(),
        sortBy: zod_1.z.string().optional(),
        sortOrder: zod_1.z.enum(['asc', 'desc']).optional(),
    }),
});
exports.EmployeeValidation = {
    createEmployeeValidation,
    updateEmployeeValidation,
    getEmployeesValidation,
};
//# sourceMappingURL=employee.validation.js.map