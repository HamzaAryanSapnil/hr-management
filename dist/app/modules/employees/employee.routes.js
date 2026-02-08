"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const multerErrorHandler_1 = require("../../middlewares/multerErrorHandler");
const multer_1 = __importDefault(require("../../../config/multer"));
const employee_controller_1 = require("./employee.controller");
const employee_validation_1 = require("./employee.validation");
const router = express_1.default.Router();
router.post('/', auth_1.default, multer_1.default.single('photo'), multerErrorHandler_1.multerErrorHandler, (0, validateRequest_1.default)(employee_validation_1.EmployeeValidation.createEmployeeValidation), employee_controller_1.EmployeeController.createEmployee);
router.get('/', auth_1.default, (0, validateRequest_1.default)(employee_validation_1.EmployeeValidation.getEmployeesValidation), employee_controller_1.EmployeeController.getAllEmployees);
router.get('/:id', auth_1.default, employee_controller_1.EmployeeController.getEmployeeById);
router.put('/:id', auth_1.default, multer_1.default.single('photo'), multerErrorHandler_1.multerErrorHandler, (0, validateRequest_1.default)(employee_validation_1.EmployeeValidation.updateEmployeeValidation), employee_controller_1.EmployeeController.updateEmployee);
router.delete('/:id', auth_1.default, employee_controller_1.EmployeeController.deleteEmployee);
exports.EmployeeRoutes = router;
//# sourceMappingURL=employee.routes.js.map