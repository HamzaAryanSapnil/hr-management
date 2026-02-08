"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.attendanceService = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const db_1 = __importDefault(require("../../../config/db"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const paginationHelper_1 = require("../../../shared/paginationHelper");
class AttendanceService {
    async createAttendance(payload) {
        const employee = await (0, db_1.default)('employees')
            .where({ id: payload.employee_id })
            .whereNull('deleted_at')
            .first();
        if (!employee) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Employee not found');
        }
        try {
            const [attendance] = await (0, db_1.default)('attendance')
                .insert({
                ...payload,
                created_at: new Date(),
                updated_at: new Date(),
            })
                .returning('*');
            return attendance;
        }
        catch (error) {
            if (error.code === '23505') {
                const [updatedAttendance] = await (0, db_1.default)('attendance')
                    .where({
                    employee_id: payload.employee_id,
                    date: payload.date,
                })
                    .update({
                    check_in_time: payload.check_in_time,
                    updated_at: new Date(),
                })
                    .returning('*');
                return updatedAttendance;
            }
            throw error;
        }
    }
    async getAllAttendance(filters, paginationOptions) {
        const { employee_id, from, to } = filters;
        const { page, limit, offset, sortBy, sortOrder } = paginationHelper_1.paginationHelper.calculatePagination(paginationOptions);
        const buildBaseQuery = () => {
            let baseQuery = (0, db_1.default)('attendance')
                .leftJoin('employees', 'attendance.employee_id', 'employees.id')
                .whereNull('employees.deleted_at');
            if (employee_id) {
                baseQuery = baseQuery.where('attendance.employee_id', employee_id);
            }
            if (from && to) {
                baseQuery = baseQuery.whereBetween('attendance.date', [from, to]);
            }
            else if (from) {
                baseQuery = baseQuery.where('attendance.date', '>=', from);
            }
            else if (to) {
                baseQuery = baseQuery.where('attendance.date', '<=', to);
            }
            return baseQuery;
        };
        const countResult = await buildBaseQuery()
            .count('attendance.id as count')
            .first();
        const total = parseInt(countResult?.count || '0');
        const attendance = await buildBaseQuery()
            .select('attendance.*', 'employees.name as employee_name')
            .orderBy(`attendance.${sortBy}`, sortOrder)
            .limit(limit)
            .offset(offset);
        const meta = paginationHelper_1.paginationHelper.calculateMeta(total, page, limit);
        return {
            meta,
            data: attendance,
        };
    }
    async getAttendanceById(id) {
        const attendance = await (0, db_1.default)('attendance')
            .select('attendance.*', 'employees.name as employee_name')
            .leftJoin('employees', 'attendance.employee_id', 'employees.id')
            .where('attendance.id', id)
            .whereNull('employees.deleted_at')
            .first();
        if (!attendance) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Attendance record not found');
        }
        return attendance;
    }
    async updateAttendance(id, payload) {
        const attendance = await this.getAttendanceById(id);
        const [updatedAttendance] = await (0, db_1.default)('attendance')
            .where({ id })
            .update({
            ...payload,
            updated_at: new Date(),
        })
            .returning('*');
        return updatedAttendance;
    }
    async deleteAttendance(id) {
        const attendance = await this.getAttendanceById(id);
        await (0, db_1.default)('attendance')
            .where({ id })
            .del();
    }
}
exports.attendanceService = new AttendanceService();
//# sourceMappingURL=attendance.service.js.map