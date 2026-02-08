import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import pick from '../../../shared/pick';
import { reportService } from './report.service';
import { IAttendanceReport, IReportFilters } from './report.types';

const getAttendanceReport = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ['month', 'employee_id']) as IReportFilters;
  const result = await reportService.getAttendanceReport(filters);

  sendResponse<IAttendanceReport[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Attendance report retrieved successfully',
    data: result,
  });
});

export const ReportController = {
  getAttendanceReport,
};