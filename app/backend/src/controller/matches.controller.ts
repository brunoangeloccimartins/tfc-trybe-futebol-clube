import { Request, Response } from 'express';
import MatchesService from '../service/matches.service';

export default class MatchesController {
  constructor(private matchesService: MatchesService = new MatchesService()) {}

  public async findAll(req: Request, res: Response) {
    const response = await this.matchesService.getMatches();
    res.status(200).json(response.data);
  }

  public async findFiltered(req: Request, res: Response) {
    const { inProgress } = req.query;
    if (inProgress === undefined || inProgress === null || inProgress === '') {
      const response = await this.matchesService.getMatches();
      res.status(200).json(response.data);
      return;
    }
    const response = await this.matchesService.getFilteredMatches(String(inProgress));
    res.status(200).json(response.data);
  }

  public async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    const response = await this.matchesService.finishMatch(Number(id));
    res.status(200).json(response.data);
  }

  public async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const { inProgress } = req.query;
    const match = { id: Number(id),
      homeTeamGoals: Number(homeTeamGoals),
      awayTeamGoals: Number(awayTeamGoals),
      inProgress: String(inProgress) === 'true' };
    const response = await this.matchesService.updateMatch(match);
    res.status(200).json(response.data);
  }

  public async createMatch(req: Request, res: Response) {
    const { homeTeamId, awayTeamId } = req.body;
    if (homeTeamId === awayTeamId) {
      res.status(422)
        .json({ message: 'It is not possible to create a match with two equal teams' });
      return;
    }
    const newMatch = {
      ...req.body,
      inProgress: true,
    };
    const response = await this.matchesService.createMatch(newMatch);
    res.status(201).json(response.data);
  }
}
