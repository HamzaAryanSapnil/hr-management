export interface IAttendanceReport {
  employee_id: number;
  employee_name: string;
  days_present: number;
  times_late: number;
}

export interface IReportFilters {
  month?: string; // YYYY-MM format
  employee_id?: string;
}