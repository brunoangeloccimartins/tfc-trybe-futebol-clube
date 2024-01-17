import { Request, Response } from 'express';
import LeaderboardService from '../service/leaderboard.service';

export default class LeaderboardController {
  constructor(
    private leaderboardService = new LeaderboardService(),
  ) {}

  public async getLeaderboard(req:Request, res:Response) {
    const path = req.path.split('/').pop();
    if (path === 'home' || path === 'away') {
      const homeOrAway = path === 'home' ? 'home' : 'away';
      const leaderboard = await this.leaderboardService.getAllLeaderboard(homeOrAway);
      return res.status(200).json(leaderboard.data);
    }
    const getAll = await this.leaderboardService.getAllLeaderboard();
    return res.status(200).json(getAll.data);
  }
}
