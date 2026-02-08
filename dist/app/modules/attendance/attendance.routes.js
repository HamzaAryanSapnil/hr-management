"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const attendance_controller_1 = require("./attendance.controller");
const attendance_validation_1 = require("./attendance.validation");
const router = express_1.default.Router();
router.post('/', auth_1.default, (0, validateRequest_1.default)(attendance_validation_1.AttendanceValidation.createAttendanceValidation), attendance_controller_1.AttendanceController.createAttendance);
router.get('/', auth_1.default, (0, validateRequest_1.default)(attendance_validation_1.AttendanceValidation.getAttendanceValidation), attendance_controller_1.AttendanceController.getAllAttendance);
router.get('/:id', auth_1.default, attendance_controller_1.AttendanceController.getAttendanceById);
router.put('/:id', auth_1.default, (0, validateRequest_1.default)(attendance_validation_1.AttendanceValidation.updateAttendanceValidation), attendance_controller_1.AttendanceController.updateAttendance);
router.delete('/:id', auth_1.default, attendance_controller_1.AttendanceController.deleteAttendance);
exports.AttendanceRoutes = router;
//# sourceMappingURL=attendance.routes.js.map