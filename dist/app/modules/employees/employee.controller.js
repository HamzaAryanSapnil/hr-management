"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const cloudinary_1 = require("../../../shared/cloudinary");
const env_1 = require("../../../config/env");
const employee_service_1 = require("./employee.service");
const createEmployee = (0, catchAsync_1.default)(async (req, res) => {
    let photoPath;
    if (req.file) {
        if (env_1.env.NODE_ENV === 'production' && req.file.buffer) {
            photoPath = await (0, cloudinary_1.uploadToCloudinary)(req.file.buffer, 'employees');
        }
        else {
            photoPath = req.file.path || req.file.filename;
        }
    }
    const employeeData = {
        ...req.body,
        photo_path: photoPath,
    };
    const result = await employee_service_1.employeeService.createEmployee(employeeData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: 'Employee created successfully',
        data: result,
    });
});
const getAllEmployees = (0, catchAsync_1.default)(async (req, res) => {
    const filters = (0, pick_1.default)(req.query, ['search', 'designation']);
    const paginationOptions = (0, pick_1.default)(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);
    const result = await employee_service_1.employeeService.getAllEmployees(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Employees retrieved successfully',
        meta: result.meta,
        data: result.data,
    });
});
const getEmployeeById = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const result = await employee_service_1.employeeService.getEmployeeById(Number(id));
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Employee retrieved successfully',
        data: result,
    });
});
const updateEmployee = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    let photoPath;
    if (req.file) {
        if (env_1.env.NODE_ENV === 'production' && req.file.buffer) {
            photoPath = await (0, cloudinary_1.uploadToCloudinary)(req.file.buffer, 'employees');
        }
        else {
            photoPath = req.file.path || req.file.filename;
        }
    }
    const employeeData = {
        ...req.body,
        ...(photoPath && { photo_path: photoPath }),
    };
    const result = await employee_service_1.employeeService.updateEmployee(Number(id), employeeData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Employee updated successfully',
        data: result,
    });
});
const deleteEmployee = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    await employee_service_1.employeeService.deleteEmployee(Number(id));
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Employee deleted successfully',
    });
});
exports.EmployeeController = {
    createEmployee,
    getAllEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
};
//# sourceMappingURL=employee.controller.js.map