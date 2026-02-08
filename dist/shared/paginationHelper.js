"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationHelper = void 0;
const calculatePagination = (options) => {
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
const calculateMeta = (total, page, limit) => {
    const totalPages = Math.ceil(total / limit);
    return {
        page,
        limit,
        total,
        totalPages,
    };
};
exports.paginationHelper = {
    calculatePagination,
    calculateMeta,
};
//# sourceMappingURL=paginationHelper.js.map