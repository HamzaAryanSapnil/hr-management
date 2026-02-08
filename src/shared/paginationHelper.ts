export interface IPaginationOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface IPaginationResult {
  page: number;
  limit: number;
  offset: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

export interface IPaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

const calculatePagination = (options: IPaginationOptions): IPaginationResult => {
  const page = Number(options.page) || 1;
  const limit = Number(options.limit) || 10;
  const offset = (page - 1) * limit;

  const sortBy = options.sortBy || 'created_at';
  const sortOrder = options.sortOrder || 'desc';

  return {
    page,
    limit,
    offset,
    sortBy,
    sortOrder,
  };
};

const calculateMeta = (total: number, page: number, limit: number): IPaginationMeta => {
  const totalPages = Math.ceil(total / limit);

  return {
    page,
    limit,
    total,
    totalPages,
  };
};

export const paginationHelper = {
  calculatePagination,
  calculateMeta,
};