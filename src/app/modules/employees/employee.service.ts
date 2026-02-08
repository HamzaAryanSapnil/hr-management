/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import db from '../../../config/db';
import AppError from '../../errors/AppError';
import { paginationHelper } from '../../../shared/paginationHelper';
// import { uploadToCloudinary } from '../../../shared/cloudinary';
// import { env } from '../../../config/env';
import {
  ICreateEmployee,
  IEmployee,
  IEmployeeFilters,
  IUpdateEmployee,
} from './employee.types';
import { IPaginationOptions } from '../../../shared/paginationHelper';

class EmployeeService {
  async createEmployee(payload: ICreateEmployee): Promise<IEmployee> {
    const [employee] = await db<IEmployee>('employees')
      .insert({
        ...payload,
        created_at: new Date(),
        updated_at: new Date(),
      })
      .returning('*');

    return employee;
  }

  async getAllEmployees(
    filters: IEmployeeFilters,
    paginationOptions: IPaginationOptions
  ) {
    const { search, designation } = filters;
    const { page, limit, offset, sortBy, sortOrder } = paginationHelper.calculatePagination(paginationOptions);

    const buildBaseQuery = () => {
      let baseQuery = db<IEmployee>('employees')
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
    const total = parseInt((countResult as any)?.count || '0');

    const employees = await buildBaseQuery()
      .orderBy(sortBy, sortOrder)
      .limit(limit)
      .offset(offset);

    const meta = paginationHelper.calculateMeta(total, page, limit);

    return {
      meta,
      data: employees,
    };
  }

  async getEmployeeById(id: number): Promise<IEmployee> {
    const employee = await db<IEmployee>('employees')
      .where({ id })
      .whereNull('deleted_at')
      .first();

    if (!employee) {
      throw new AppError(httpStatus.NOT_FOUND, 'Employee not found');
    }

    return employee;
  }

  async updateEmployee(
    id: number,
    payload: IUpdateEmployee
  ): Promise<IEmployee> {
    const employee = await this.getEmployeeById(id);

    const [updatedEmployee] = await db<IEmployee>('employees')
      .where({ id })
      .update({
        ...payload,
        updated_at: new Date(),
      })
      .returning('*');

    return updatedEmployee;
  }

  async deleteEmployee(id: number): Promise<void> {
    const employee = await this.getEmployeeById(id);

    await db<IEmployee>('employees')
      .where({ id })
      .update({
        deleted_at: new Date(),
        updated_at: new Date(),
      });
  }
}

export const employeeService = new EmployeeService();