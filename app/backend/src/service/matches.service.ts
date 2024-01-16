import IMatchesModel from '../Interfaces/IMatchesModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import MatchesModel from '../model/matches.model';
import IMatches from '../Interfaces/IMatches';

export default class MatchesService {
  constructor(
    private ModelMatches: MatchesModel = new MatchesModel(),
  ) { }

  public async getMatches(): Promise<ServiceResponse<IMatches[]>> {
    const matches = await this.ModelMatches.getMatches();
    return { status: 'SUCCESS', data: matches };
  }

  public async getFilteredMatches(filter: string): Promise<ServiceResponse<IMatches[]>> {
    const matches = await this.ModelMatches.getFilteredMatches(filter);
    return { status: 'SUCCESS', data: matches };
  }

  public async finishMatch(id: number): Promise<ServiceResponse<IMatches>> {
    await this.ModelMatches.finishMatch(id);
    return { status: 'SUCCESS', data: { message: 'Finished' } };
  }

  public async updateMatch(match: IMatches): Promise<ServiceResponse<IMatchesModel>> {
    await this.ModelMatches.updateMatch(match);
    return { status: 'SUCCESS', data: { message: 'Match Updated' } };
  }

  public async createMatch(match: IMatches): Promise<ServiceResponse<IMatches>> {
    const newMatch = await this.ModelMatches.createMatch(match);
    return { status: 'SUCCESS', data: newMatch };
  }
}
