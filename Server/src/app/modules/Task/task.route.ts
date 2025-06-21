import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { TaskValidation } from './task.validation';
import { TaskControllers } from './task.controller';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.USER, USER_ROLE.ADMIN),
  validateRequest(TaskValidation.createTaskValidationSchema),
  TaskControllers.createTask
);

router.get('/', TaskControllers.getAllTask);

router.get('/:id', TaskControllers.getSingleTask);

router.put(
  '/:id',
  auth(USER_ROLE.USER, USER_ROLE.ADMIN),
  validateRequest(TaskValidation.updateTaskValidationSchema),
  TaskControllers.updateTask
);

router.delete('/:id', auth(USER_ROLE.USER, USER_ROLE.ADMIN), TaskControllers.deleteTask);

export const TaskRoutes = router;