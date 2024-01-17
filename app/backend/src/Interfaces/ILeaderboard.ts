export type SimpleLeaderboard = {
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
};

export default interface Leaderboard extends SimpleLeaderboard {
  name?: string;
  goalsBalance: number;
  efficiency: string;
}

export type Result = 'totalVictories' | 'totalDraws' | 'totalLosses';
