import { Request, Response, Router } from 'express';
import MatchesController from '../controller/matches.controller';

const matchesController = new MatchesController();

const router = Router();

router.get('/', (req: Request, res: Response) => matchesController.findAll(req, res));

export default router;
