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
}
