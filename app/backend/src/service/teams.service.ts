import TeamModel from '../model/team.model';
import ITeam from '../Interfaces/ITeam';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class TeamService {
  constructor(
    private teamModel: TeamModel = new TeamModel(),
  ) { }

  public async findAll(): Promise<ServiceResponse<ITeam[]>> {
    const teams = await this.teamModel.findAll();
    return { status: 'SUCCESS', data: teams };
  }

  public async findById(id: ITeam['id']): Promise<ServiceResponse<ITeam | null>> {
    const team = await this.teamModel.findById(id);
    if (!team) return { status: 'NOT_FOUND', data: { message: 'Team not found' } };
    return { status: 'SUCCESS', data: team };
  }
}
