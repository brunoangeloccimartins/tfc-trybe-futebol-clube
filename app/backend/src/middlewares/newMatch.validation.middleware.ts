import { NextFunction, Request, Response } from 'express';
import MatchesModel from '../model/matches.model';

export default class NewMatchValidation {
  private static async validateTeams(homeTeamId: number, awayTeamId: number): Promise<boolean> {
    const model = new MatchesModel();
    const homeTeam = await model.findMatchById(homeTeamId);
    const awayTeam = await model.findMatchById(awayTeamId);
    if (!homeTeam || !awayTeam) {
      return false;
    }
    return true;
  }

  static async validateNewMatch(req:Request, res:Response, next:NextFunction) {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;
    if (!homeTeamId || !awayTeamId || !homeTeamGoals || !awayTeamGoals) {
      res.status(422).json({ message: 'Missing parameters' });
      return;
    }
    if (homeTeamId === awayTeamId) {
      res.status(422)
        .json({ message: 'It is not possible to create a match with two equal teams' });
      return;
    }
    const validTeams = await NewMatchValidation.validateTeams(homeTeamId, awayTeamId);
    if (!validTeams) {
      res.status(404).json({ message: 'There is no team with such id!' });
      return;
    }
    next();
  }
}
