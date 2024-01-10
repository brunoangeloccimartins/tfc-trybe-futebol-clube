import ITeam from '../Interfaces/ITeam';
import { ITeamModel } from '../Interfaces/ITeamModel';
import SequelizeTeam from '../database/models/teams.sequelize.model';

export default class TeamModel implements ITeamModel {
  private model = SequelizeTeam;

  async findAll() : Promise<ITeam[]> {
    return this.model.findAll();
  }

  async findById(id: ITeam['id']) : Promise<ITeam | null> {
    const data = await this.model.findByPk(id);
    if (data === null) return null;
    return data;
  }
}
