import { Request, Response, Router } from 'express';
import MatchesController from '../controller/matches.controller';
import Validation from '../middlewares/login.validation.middleware';
import NewMatchValidation from '../middlewares/newMatch.validation.middleware';

const matchesController = new MatchesController();

const router = Router();

router.get('/', (req: Request, res: Response) => matchesController.findFiltered(req, res));
router.patch(
  '/:id/finish',
  Validation.validateToken,
  (req: Request, res: Response) => matchesController.finishMatch(req, res),
);
router.patch(
  '/:id',
  Validation.validateToken,
  (req: Request, res: Response) => matchesController.updateMatch(req, res),
);
router.post(
  '/',
  Validation.validateToken,
  NewMatchValidation.validateNewMatch,
  (req: Request, res: Response) => matchesController.createMatch(req, res),
);

export default router;
