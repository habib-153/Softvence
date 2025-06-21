"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("../User/user.constant");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const task_validation_1 = require("./task.validation");
const task_controller_1 = require("./task.controller");
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)(user_constant_1.USER_ROLE.USER, user_constant_1.USER_ROLE.ADMIN), (0, validateRequest_1.default)(task_validation_1.TaskValidation.createTaskValidationSchema), task_controller_1.TaskControllers.createTask);
router.get('/', task_controller_1.TaskControllers.getAllTask);
router.get('/:id', task_controller_1.TaskControllers.getSingleTask);
router.put('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.USER, user_constant_1.USER_ROLE.ADMIN), (0, validateRequest_1.default)(task_validation_1.TaskValidation.updateTaskValidationSchema), task_controller_1.TaskControllers.updateTask);
router.delete('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.USER, user_constant_1.USER_ROLE.ADMIN), task_controller_1.TaskControllers.deleteTask);
exports.TaskRoutes = router;
