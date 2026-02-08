"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportValidation = void 0;
const zod_1 = require("zod");
const getAttendanceReportValidation = zod_1.z.object({
    query: zod_1.z.object({
        month: zod_1.z.string().regex(/^\d{4}-\d{2}$/, 'Month must be in YYYY-MM format'),
        employee_id: zod_1.z.string().optional(),
    }),
});
exports.ReportValidation = {
    getAttendanceReportValidation,
};
//# sourceMappingURL=report.validation.js.map