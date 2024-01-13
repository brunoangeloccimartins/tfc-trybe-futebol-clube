import SequelizeTeam from '../database/models/teams.sequelize.model';
import SequelizeMatches from '../database/models/matches.sequelize.model';
import IMatchesModel from '../Interfaces/IMatchesModel';
import IMatches from '../Interfaces/IMatches';

export default class MatchesModel implements IMatchesModel {
  private model = SequelizeMatches;

  async getMatches(): Promise<IMatches[]> {
    const matches = await this.model.findAll({
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return matches;
  }
}
