import { Router } from 'express';
import teamRouter from './team.routes';
import loginRouter from './login.routes';

const router = Router();

router.use('/teams', teamRouter);
router.use('/teams/:id', teamRouter);
router.use('/login', loginRouter);
router.use('/login/role', loginRouter);

export default router;
