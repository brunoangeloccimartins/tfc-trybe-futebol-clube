import { ServiceResponse } from '../Interfaces/ServiceResponse';
import IMatches from '../Interfaces/IMatches';
import Leaderboard, { Result, SimpleLeaderboard } from '../Interfaces/ILeaderboard';
import MatchesModel from '../model/matches.model';
import IMatchesModel from '../Interfaces/IMatchesModel';
import { ITeamModel } from '../Interfaces/ITeamModel';
import TeamModel from '../model/team.model';

export default class LeaderboardService {
  constructor(
    private teamModel: ITeamModel = new TeamModel(),
    private matchModel: IMatchesModel = new MatchesModel(),
  ) {}

  private static zeroTeam(): SimpleLeaderboard {
    return {
      totalPoints: 0,
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
    };
  }

  private static homeOrAwayTeam(matches: IMatches[], idTeam:number) {
    const finishedMatches = matches.filter((match) => !match.inProgress);
    const homeTeam = finishedMatches.filter((match) => match.homeTeamId === idTeam);
    const awayTeam = finishedMatches.filter((match) => match.awayTeamId === idTeam);
    return { homeTeam, awayTeam };
  }

  private static calcEfficiency(totalPoins:number, totalGames:number): number {
    return Number(((totalPoins / (totalGames * 3)) * 100).toFixed(2));
  }

  private static calcPoints(goalsFavor:number, goalsOwn:number): [number, Result] {
    if (goalsFavor > goalsOwn) return [3, 'totalVictories'];
    if (goalsFavor === goalsOwn) return [1, 'totalDraws'];
    return [0, 'totalLosses'];
  }

  private static editTeam(idTeam:number, match: IMatches): SimpleLeaderboard {
    const team = LeaderboardService.zeroTeam();
    let points: number;
    let result: Result;
    if (match.awayTeamId === idTeam) {
      [points, result] = this.calcPoints(match.awayTeamGoals, match.homeTeamGoals);
      team.goalsFavor = match.awayTeamGoals;
      team.goalsOwn = match.homeTeamGoals;
    } else {
      [points, result] = this.calcPoints(match.homeTeamGoals, match.awayTeamGoals);
      team.goalsFavor = match.homeTeamGoals;
      team.goalsOwn = match.awayTeamGoals;
    }
    team.totalPoints += points;
    team.totalGames += 1;
    team[result] += 1;
    return team;
  }

  private static reduceInfo(allInfo:SimpleLeaderboard[]): Leaderboard {
    const reduce = allInfo.reduce(
      (acc, curr) => {
        acc.totalPoints += curr.totalPoints;
        acc.totalGames += curr.totalGames;
        acc.totalVictories += curr.totalVictories;
        acc.totalDraws += curr.totalDraws;
        acc.totalLosses += curr.totalLosses;
        acc.goalsFavor += curr.goalsFavor;
        acc.goalsOwn += curr.goalsOwn;
        return acc;
      },
      LeaderboardService.zeroTeam(),
    );

    return {
      ...reduce,
      goalsBalance: reduce.goalsFavor - reduce.goalsOwn,
      efficiency: String(LeaderboardService.calcEfficiency(reduce.totalPoints, reduce.totalGames)),
    };
  }

  private static sortLeaderboard(leaderboard: Leaderboard[]): Leaderboard[] {
    return leaderboard.sort((a, b) => {
      if (b.totalPoints !== a.totalPoints) return b.totalPoints - a.totalPoints;
      if (b.goalsBalance !== a.goalsBalance) return b.goalsBalance - a.goalsBalance;
      if (b.goalsFavor !== a.goalsFavor) return b.goalsFavor - a.goalsFavor;
      return 0;
    });
  }

  private async getHomeTeam() {
    const teams = await this.teamModel.findAll();
    const matches = await this.matchModel.getMatches();

    const promises = teams.map(async (team) => {
      const { homeTeam } = await LeaderboardService.homeOrAwayTeam(matches, team.id);
      const homeTeamInfo: SimpleLeaderboard[] = [];

      homeTeam.forEach((match) => {
        const teamMatchInfo = LeaderboardService.editTeam(team.id, match);
        homeTeamInfo.push(teamMatchInfo);
      });
      const totalTeamInfo = LeaderboardService.reduceInfo(homeTeamInfo);
      const { teamName } = team;
      const leaderboard = { name: teamName, ...totalTeamInfo };
      return leaderboard;
    });
    const leaderboard = await Promise.all(promises);
    const sortedLeaderboard = LeaderboardService.sortLeaderboard(leaderboard);
    return { status: 'SUCCESS', data: sortedLeaderboard };
  }

  private async getAwayTeam() {
    const teams = await this.teamModel.findAll();
    const matches = await this.matchModel.getMatches();

    const promises = teams.map(async (team) => {
      const { awayTeam } = await LeaderboardService.homeOrAwayTeam(matches, team.id);
      const awayTeamInfo: SimpleLeaderboard[] = [];

      awayTeam.forEach((match) => {
        const teamMatchInfo = LeaderboardService.editTeam(team.id, match);
        awayTeamInfo.push(teamMatchInfo);
      });
      const totalTeamInfo = LeaderboardService.reduceInfo(awayTeamInfo);
      const { teamName } = team;
      const leaderboard = { name: teamName, ...totalTeamInfo };
      return leaderboard;
    });
    const leaderboard = await Promise.all(promises);
    const sortedLeaderboard = LeaderboardService.sortLeaderboard(leaderboard);
    return { status: 'SUCCESS', data: sortedLeaderboard };
  }

  public async getAllLeaderboard(homeOrAway?: string)
    : Promise<ServiceResponse<Leaderboard[]>> {
    if (homeOrAway === 'home') {
      const leaderboard = await this.getHomeTeam();
      return { status: 'SUCCESS', data: leaderboard.data };
    }
    if (homeOrAway === 'away') {
      const leaderboard = await this.getAwayTeam();
      return { status: 'SUCCESS', data: leaderboard.data };
    }
    const homeTeam = await this.getHomeTeam();
    return { status: 'SUCCESS', data: homeTeam.data };
  }
}
