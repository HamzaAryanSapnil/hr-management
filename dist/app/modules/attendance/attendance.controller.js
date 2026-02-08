"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const attendance_service_1 = require("./attendance.service");
const createAttendance = (0, catchAsync_1.default)(async (req, res) => {
    const result = await attendance_service_1.attendanceService.createAttendance(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: 'Attendance record created successfully',
        data: result,
    });
});
const getAllAttendance = (0, catchAsync_1.default)(async (req, res) => {
    const filters = (0, pick_1.default)(req.query, ['employee_id', 'from', 'to']);
    const paginationOptions = (0, pick_1.default)(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);
    const result = await attendance_service_1.attendanceService.getAllAttendance(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Attendance records retrieved successfully',
        meta: result.meta,
        data: result.data,
    });
});
const getAttendanceById = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const result = await attendance_service_1.attendanceService.getAttendanceById(Number(id));
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Attendance record retrieved successfully',
        data: result,
    });
});
const updateAttendance = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const result = await attendance_service_1.attendanceService.updateAttendance(Number(id), req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Attendance record updated successfully',
        data: result,
    });
});
const deleteAttendance = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    await attendance_service_1.attendanceService.deleteAttendance(Number(id));
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Attendance record deleted successfully',
    });
});
exports.AttendanceController = {
    createAttendance,
    getAllAttendance,
    getAttendanceById,
    updateAttendance,
    deleteAttendance,
};
//# sourceMappingURL=attendance.controller.js.map