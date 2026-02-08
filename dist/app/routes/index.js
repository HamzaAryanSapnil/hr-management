"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = require("../modules/auth/auth.routes");
const employee_routes_1 = require("../modules/employees/employee.routes");
const attendance_routes_1 = require("../modules/attendance/attendance.routes");
const report_routes_1 = require("../modules/reports/report.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_routes_1.AuthRoutes,
    },
    {
        path: '/employees',
        route: employee_routes_1.EmployeeRoutes,
    },
    {
        path: '/attendance',
        route: attendance_routes_1.AttendanceRoutes,
    },
    {
        path: '/reports',
        route: report_routes_1.ReportRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
//# sourceMappingURL=index.js.map