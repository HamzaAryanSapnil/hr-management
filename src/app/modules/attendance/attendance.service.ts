/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import db from '../../../config/db';
import AppError from '../../errors/AppError';
import { paginationHelper } from '../../../shared/paginationHelper';
import {
  IAttendance,
  IAttendanceFilters,
  ICreateAttendance,
  IUpdateAttendance,
} from './attendance.types';
import { IPaginationOptions } from '../../../shared/paginationHelper';

class AttendanceService {
  async createAttendance(payload: ICreateAttendance): Promise<IAttendance> {
   
    const employee = await db('employees')
      .where({ id: payload.employee_id })
      .whereNull('deleted_at')
      .first();

    if (!employee) {
      throw new AppError(httpStatus.NOT_FOUND, 'Employee not found');
    }

    try {
      const [attendance] = await db<IAttendance>('attendance')
        .insert({
          ...payload,
          created_at: new Date(),
          updated_at: new Date(),
        })
        .returning('*');

      return attendance;
    } catch (error: any) {
      if (error.code === '23505') {
        const [updatedAttendance] = await db<IAttendance>('attendance')
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

  async getAllAttendance(
    filters: IAttendanceFilters,
    paginationOptions: IPaginationOptions
  ) {
    const { employee_id, from, to } = filters;
    const { page, limit, offset, sortBy, sortOrder } = paginationHelper.calculatePagination(paginationOptions);

    
    const buildBaseQuery = () => {
      let baseQuery = db<IAttendance>('attendance')
        .leftJoin('employees', 'attendance.employee_id', 'employees.id')
        .whereNull('employees.deleted_at');

      if (employee_id) {
        baseQuery = baseQuery.where('attendance.employee_id', employee_id);
      }

      if (from && to) {
        baseQuery = baseQuery.whereBetween('attendance.date', [from, to]);
      } else if (from) {
        baseQuery = baseQuery.where('attendance.date', '>=', from);
      } else if (to) {
        baseQuery = baseQuery.where('attendance.date', '<=', to);
      }

      return baseQuery;
    };

   
    const countResult = await buildBaseQuery()
      .count('attendance.id as count')
      .first();
    const total = parseInt((countResult as any)?.count || '0');

    const attendance = await buildBaseQuery()
      .select('attendance.*', 'employees.name as employee_name')
      .orderBy(`attendance.${sortBy}`, sortOrder)
      .limit(limit)
      .offset(offset);

    const meta = paginationHelper.calculateMeta(total, page, limit);

    return {
      meta,
      data: attendance,
    };
  }

  async getAttendanceById(id: number): Promise<IAttendance> {
    const attendance = await db<IAttendance>('attendance')
      .select('attendance.*', 'employees.name as employee_name')
      .leftJoin('employees', 'attendance.employee_id', 'employees.id')
      .where('attendance.id', id)
      .whereNull('employees.deleted_at')
      .first();

    if (!attendance) {
      throw new AppError(httpStatus.NOT_FOUND, 'Attendance record not found');
    }

    return attendance;
  }

  async updateAttendance(
    id: number,
    payload: IUpdateAttendance
  ): Promise<IAttendance> {
    const attendance = await this.getAttendanceById(id);

    const [updatedAttendance] = await db<IAttendance>('attendance')
      .where({ id })
      .update({
        ...payload,
        updated_at: new Date(),
      })
      .returning('*');

    return updatedAttendance;
  }

  async deleteAttendance(id: number): Promise<void> {
    const attendance = await this.getAttendanceById(id);

    await db<IAttendance>('attendance')
      .where({ id })
      .del();
  }
}

export const attendanceService = new AttendanceService();
