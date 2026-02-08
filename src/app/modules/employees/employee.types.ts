export interface IEmployee {
  id: number;
  name: string;
  age: number;
  designation: string;
  hiring_date: Date;
  date_of_birth: Date;
  salary: number;
  photo_path?: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}

export interface ICreateEmployee {
  name: string;
  age: number;
  designation: string;
  hiring_date: Date;
  date_of_birth: Date;
  salary: number;
  photo_path?: string;
}

export interface IUpdateEmployee {
  name?: string;
  age?: number;
  designation?: string;
  hiring_date?: Date;
  date_of_birth?: Date;
  salary?: number;
  photo_path?: string;
}

export interface IEmployeeFilters {
  search?: string;
  designation?: string;
}

export interface IEmployeeQueryParams extends IEmployeeFilters {
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}