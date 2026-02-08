export interface IAttendance {
  id: number;
  employee_id: number;
  date: Date;
  check_in_time: string;
  created_at: Date;
  updated_at: Date;
}

export interface ICreateAttendance {
  employee_id: number;
  date: Date;
  check_in_time: string;
}

export interface IUpdateAttendance {
  check_in_time?: string;
}

export interface IAttendanceFilters {
  employee_id?: string;
  from?: string;
  to?: string;
}

export interface IAttendanceQueryParams extends IAttendanceFilters {
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}