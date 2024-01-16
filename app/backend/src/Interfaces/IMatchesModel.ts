import IMatches from './IMatches';

export default interface IMatchesModel {
  getMatches(): Promise<IMatches[]>;
  getFilteredMatches(filter: string): Promise<IMatches[]>;
  findMatchById(id: number): Promise<IMatches | null>;
  finishMatch(id: number): Promise<void>;
  updateMatch(match: IMatches): Promise<void>;
  createMatch(match: IMatches): Promise<IMatches>;
}
