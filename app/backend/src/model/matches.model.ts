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

  async getFilteredMatches(filter: string): Promise<IMatches[]> {
    const matches = await this.getMatches();
    const filteredMatches = matches.filter((match) => match.inProgress === (filter === 'true'));
    return filteredMatches;
  }

  async findMatchById(id: number): Promise<IMatches | null> {
    const match = await this.model.findByPk(id);
    return match;
  }

  async finishMatch(id: number): Promise<void> {
    await this.model.update({ inProgress: false }, { where: { id } });
  }

  async updateMatch(match: IMatches): Promise<void> {
    const { id, homeTeamGoals, awayTeamGoals } = match;
    await this.model.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  }
}
