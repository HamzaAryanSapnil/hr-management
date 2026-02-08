"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeService = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const db_1 = __importDefault(require("../../../config/db"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const paginationHelper_1 = require("../../../shared/paginationHelper");
class EmployeeService {
    async createEmployee(payload) {
        const [employee] = await (0, db_1.default)('employees')
            .insert({
            ...payload,
            created_at: new Date(),
            updated_at: new Date(),
        })
            .returning('*');
        return employee;
    }
    async getAllEmployees(filters, paginationOptions) {
        const { search, designation } = filters;
        const { page, limit, offset, sortBy, sortOrder } = paginationHelper_1.paginationHelper.calculatePagination(paginationOptions);
        const buildBaseQuery = () => {
            let baseQuery = (0, db_1.default)('employees')
                .whereNull('deleted_at');
            if (search) {
                baseQuery = baseQuery.where((builder) => {
                    builder
                        .where('name', 'ilike', `%${search}%`)
                        .orWhere('designation', 'ilike', `%${search}%`);
                });
            }
            if (designation) {
                baseQuery = baseQuery.where('designation', 'ilike', `%${designation}%`);
            }
            return baseQuery;
        };
        const countResult = await buildBaseQuery()
            .count('id as count')
            .first();
        const total = parseInt(countResult?.count || '0');
        const employees = await buildBaseQuery()
            .orderBy(sortBy, sortOrder)
            .limit(limit)
            .offset(offset);
        const meta = paginationHelper_1.paginationHelper.calculateMeta(total, page, limit);
        return {
            meta,
            data: employees,
        };
    }
    async getEmployeeById(id) {
        const employee = await (0, db_1.default)('employees')
            .where({ id })
            .whereNull('deleted_at')
            .first();
        if (!employee) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Employee not found');
        }
        return employee;
    }
    async updateEmployee(id, payload) {
        const employee = await this.getEmployeeById(id);
        const [updatedEmployee] = await (0, db_1.default)('employees')
            .where({ id })
            .update({
            ...payload,
            updated_at: new Date(),
        })
            .returning('*');
        return updatedEmployee;
    }
    async deleteEmployee(id) {
        const employee = await this.getEmployeeById(id);
        await (0, db_1.default)('employees')
            .where({ id })
            .update({
            deleted_at: new Date(),
            updated_at: new Date(),
        });
    }
}
exports.employeeService = new EmployeeService();
//# sourceMappingURL=employee.service.js.map