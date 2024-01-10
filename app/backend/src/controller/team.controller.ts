import { Request, Response } from 'express';
import TeamService from '../service/teams.service';

export default class TeamController {
  constructor(
    private teamService: TeamService = new TeamService(),
  ) { }

  public async findAll(req: Request, res: Response) {
    const response = await this.teamService.findAll();
    res.status(200).json(response.data);
  }

  public async findById(req: Request, res: Response) {
    const { id } = req.params;
    const response = await this.teamService.findById(Number(id));
    if (response.status === 'NOT_FOUND') return res.status(404).json(response.data);
    res.status(200).json(response.data);
  }
}
