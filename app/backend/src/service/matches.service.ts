import { ServiceResponse } from '../Interfaces/ServiceResponse';
import MatchesModel from '../model/matches.model';
import IMatches from '../Interfaces/IMatches';

export default class MatchesService {
  constructor(
    private ModelMatches: MatchesModel = new MatchesModel(),
  ) { }

  public async getMatches(): Promise<IMatches[]> {
    const matches = await this.ModelMatches.getMatches();
    return matches;
  }

  public async getFilteredMatches(filter: string): Promise<ServiceResponse<IMatches[]>> {
    const matches = await this.ModelMatches.getFilteredMatches(filter);
    return { status: 'SUCCESS', data: matches };
  }

  public async finishMatch(id: number): Promise<ServiceResponse<IMatches>> {
    await this.ModelMatches.finishMatch(id);
    return { status: 'SUCCESS', data: { message: 'Finished' } };
  }

  public async updateMatch(match: IMatches): Promise<ServiceResponse<IMatches>> {
    await this.ModelMatches.updateMatch(match);
    return { status: 'SUCCESS', data: { message: 'Match Updated' } };
  }
}
