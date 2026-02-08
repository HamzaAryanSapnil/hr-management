/* eslint-disable @typescript-eslint/no-explicit-any */
import db from '../../../config/db';
import { IAttendanceReport, IReportFilters } from './report.types';

class ReportService {
  async getAttendanceReport(filters: IReportFilters): Promise<IAttendanceReport[]> {
    const { month, employee_id } = filters;

    if (!month) {
      throw new Error('Month is required in YYYY-MM format');
    }

    const startOfMonth = new Date(`${month}-01`);
    const endOfMonth = new Date(startOfMonth.getFullYear(), startOfMonth.getMonth() + 1, 0);

    let query = db('attendance')
      .select(
        'employees.id as employee_id',
        'employees.name as employee_name',
        db.raw('COUNT(DISTINCT attendance.date) as days_present'),
        db.raw("COUNT(CASE WHEN attendance.check_in_time > '09:45:00' THEN 1 END) as times_late")
      )
      .leftJoin('employees', 'attendance.employee_id', 'employees.id')
      .whereBetween('attendance.date', [startOfMonth, endOfMonth])
      .whereNull('employees.deleted_at')
      .groupBy('employees.id', 'employees.name')
      .orderBy('employees.name');

    if (employee_id) {
      query = query.where('employees.id', employee_id);
    }

    const result = await query;

    return result.map((row: any) => ({
      employee_id: row.employee_id,
      employee_name: row.employee_name,
      days_present: parseInt(row.days_present),
      times_late: parseInt(row.times_late),
    }));
  }
}

export const reportService = new ReportService();