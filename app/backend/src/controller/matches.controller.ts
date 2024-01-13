import { Request, Response } from 'express';
import MatchesService from '../service/matches.service';

export default class MatchesController {
  constructor(private matchesService: MatchesService = new MatchesService()) {}

  public async findAll(req: Request, res: Response) {
    const response = await this.matchesService.getMatches();
    console.log(response);
    res.status(200).json(response);
  }
}
