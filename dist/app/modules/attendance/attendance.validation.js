"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceValidation = void 0;
const zod_1 = require("zod");
const createAttendanceValidation = zod_1.z.object({
    body: zod_1.z.object({
        employee_id: zod_1.z.number().positive('Employee ID must be positive'),
        date: zod_1.z.string().transform((str) => new Date(str)),
        check_in_time: zod_1.z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/, 'Invalid time format (HH:MM:SS)'),
    }),
});
const updateAttendanceValidation = zod_1.z.object({
    body: zod_1.z.object({
        check_in_time: zod_1.z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/, 'Invalid time format (HH:MM:SS)').optional(),
    }),
});
const getAttendanceValidation = zod_1.z.object({
    query: zod_1.z.object({
        employee_id: zod_1.z.string().optional(),
        from: zod_1.z.string().optional(),
        to: zod_1.z.string().optional(),
        page: zod_1.z.string().optional(),
        limit: zod_1.z.string().optional(),
        sortBy: zod_1.z.string().optional(),
        sortOrder: zod_1.z.enum(['asc', 'desc']).optional(),
    }),
});
exports.AttendanceValidation = {
    createAttendanceValidation,
    updateAttendanceValidation,
    getAttendanceValidation,
};
//# sourceMappingURL=attendance.validation.js.map