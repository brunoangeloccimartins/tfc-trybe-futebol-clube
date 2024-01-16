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
    const match = req.body;
    const response = await this.matchesService.updateMatch(match);
    res.status(200).json(response.data);
  }
}
