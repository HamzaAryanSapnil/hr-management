import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import pick from '../../../shared/pick';
import { attendanceService } from './attendance.service';
import { IAttendance } from './attendance.types';

const createAttendance = catchAsync(async (req: Request, res: Response) => {
  const result = await attendanceService.createAttendance(req.body);

  sendResponse<IAttendance>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Attendance record created successfully',
    data: result,
  });
});

const getAllAttendance = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ['employee_id', 'from', 'to']);
  const paginationOptions = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);

  const result = await attendanceService.getAllAttendance(filters, paginationOptions);

  sendResponse<IAttendance[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Attendance records retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getAttendanceById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await attendanceService.getAttendanceById(Number(id));

  sendResponse<IAttendance>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Attendance record retrieved successfully',
    data: result,
  });
});

const updateAttendance = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await attendanceService.updateAttendance(Number(id), req.body);

  sendResponse<IAttendance>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Attendance record updated successfully',
    data: result,
  });
});

const deleteAttendance = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await attendanceService.deleteAttendance(Number(id));

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Attendance record deleted successfully',
  });
});

export const AttendanceController = {
  createAttendance,
  getAllAttendance,
  getAttendanceById,
  updateAttendance,
  deleteAttendance,
};