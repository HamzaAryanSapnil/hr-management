"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const report_controller_1 = require("./report.controller");
const report_validation_1 = require("./report.validation");
const router = express_1.default.Router();
router.get('/attendance', auth_1.default, (0, validateRequest_1.default)(report_validation_1.ReportValidation.getAttendanceReportValidation), report_controller_1.ReportController.getAttendanceReport);
exports.ReportRoutes = router;
//# sourceMappingURL=report.routes.js.map