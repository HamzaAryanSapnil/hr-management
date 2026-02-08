"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const db_1 = __importDefault(require("../../../config/db"));
class ReportService {
    async getAttendanceReport(filters) {
        const { month, employee_id } = filters;
        if (!month) {
            throw new Error('Month is required in YYYY-MM format');
        }
        const startOfMonth = new Date(`${month}-01`);
        const endOfMonth = new Date(startOfMonth.getFullYear(), startOfMonth.getMonth() + 1, 0);
        let query = (0, db_1.default)('attendance')
            .select('employees.id as employee_id', 'employees.name as employee_name', db_1.default.raw('COUNT(DISTINCT attendance.date) as days_present'), db_1.default.raw("COUNT(CASE WHEN attendance.check_in_time > '09:45:00' THEN 1 END) as times_late"))
            .leftJoin('employees', 'attendance.employee_id', 'employees.id')
            .whereBetween('attendance.date', [startOfMonth, endOfMonth])
            .whereNull('employees.deleted_at')
            .groupBy('employees.id', 'employees.name')
            .orderBy('employees.name');
        if (employee_id) {
            query = query.where('employees.id', employee_id);
        }
        const result = await query;
        return result.map((row) => ({
            employee_id: row.employee_id,
            employee_name: row.employee_name,
            days_present: parseInt(row.days_present),
            times_late: parseInt(row.times_late),
        }));
    }
}
exports.reportService = new ReportService();
//# sourceMappingURL=report.service.js.map