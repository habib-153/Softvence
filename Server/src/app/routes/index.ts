import express from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { TaskRoutes } from '../modules/Task/task.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/tasks',
    route: TaskRoutes
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
