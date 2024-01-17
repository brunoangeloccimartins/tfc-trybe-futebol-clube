import { Request, Response, Router } from 'express';
import LeaderboardController from '../controller/leaderboard.controller';

const leaderBoardController = new LeaderboardController();

const router = Router();

router.get(
  '/',
  (req: Request, res: Response) => leaderBoardController.getLeaderboard(req, res),
);
router.get(
  '/home',
  (req: Request, res: Response) => leaderBoardController.getLeaderboard(req, res),
);
router.get(
  '/away',
  (req: Request, res: Response) => leaderBoardController.getLeaderboard(req, res),
);

export default router;
