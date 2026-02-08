import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import pick from '../../../shared/pick';
import { uploadToCloudinary } from '../../../shared/cloudinary';
import { env } from '../../../config/env';
import { employeeService } from './employee.service';
import { IEmployee } from './employee.types';

const createEmployee = catchAsync(async (req: Request, res: Response) => {
  let photoPath: string | undefined;

  if (req.file) {
    if (env.NODE_ENV === 'production' && req.file.buffer) {
      
      photoPath = await uploadToCloudinary(req.file.buffer, 'employees');
    } else {
      photoPath = req.file.path || req.file.filename;
    }
  }

  const employeeData = {
    ...req.body,
    photo_path: photoPath,
  };

  const result = await employeeService.createEmployee(employeeData);

  sendResponse<IEmployee>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Employee created successfully',
    data: result,
  });
});

const getAllEmployees = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ['search', 'designation']);
  const paginationOptions = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);

  const result = await employeeService.getAllEmployees(filters, paginationOptions);

  sendResponse<IEmployee[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Employees retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getEmployeeById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await employeeService.getEmployeeById(Number(id));

  sendResponse<IEmployee>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Employee retrieved successfully',
    data: result,
  });
});

const updateEmployee = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  let photoPath: string | undefined;

  if (req.file) {
    if (env.NODE_ENV === 'production' && req.file.buffer) {
      photoPath = await uploadToCloudinary(req.file.buffer, 'employees');
    } else {
      photoPath = req.file.path || req.file.filename;
    }
  }

  const employeeData = {
    ...req.body,
    ...(photoPath && { photo_path: photoPath }),
  };

  const result = await employeeService.updateEmployee(Number(id), employeeData);

  sendResponse<IEmployee>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Employee updated successfully',
    data: result,
  });
});

const deleteEmployee = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await employeeService.deleteEmployee(Number(id));

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Employee deleted successfully',
  });
});

export const EmployeeController = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};