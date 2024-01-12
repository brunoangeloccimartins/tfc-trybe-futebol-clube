import { Request, Router, Response } from 'express';
import Validation from '../middlewares/login.validation.middleware';
import UserController from '../controller/user.controller';

const userController = new UserController();

const router = Router();

router.post(
  '/',
  Validation.loginValidation,
  (req: Request, res: Response) => userController.login(req, res),
);

router.get(
  '/role',
  Validation.validateToken,
  (req: Request, res: Response) => UserController.getRole(req, res),
);

export default router;
