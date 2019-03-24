import {
  getSeason
} from "../configs/firebase";
import {
  FETCH_MATCHES, 
  FETCH_RANKING
} from "./types";
import {
  data as getTeams
} from '../selectors/teamsSelector';

const CURRENT_SEASON = '2018-2019';

/**
 * @description
 * - Fetch the matches data;
 * - Compute data to create a rank;
 * - Dispatch the data to reducer;
 */
export const fetch = () => (dispatch, getState) => {
  getSeason(CURRENT_SEASON).on('value', (snapshot) => {
    dispatch({
      type: FETCH_MATCHES,
      payload: snapshot.val()
    });

    const matches = snapshot.val();
    const teams = getTeams(getState());
    groupTeamsByMatches(teams, matches)
      .then((matchesByTeam) => computeMatches(matchesByTeam))
      .then((matchesByTeam) => computeRanking(matchesByTeam))
      .then((matchesByTeam) => {
        dispatch({
          type: FETCH_RANKING,
          payload: matchesByTeam
        });
      })
  });
};

const computeRanking = (teams) => new Promise((resolve, reject) => {
  const teamsWithRanking = teams.map((team) => {
    team.points = ((team.drawns * 1) + (team.wins * 3));
    return team;
  })
    .sort((a, b) => {
      if (a.points < b.points) {
        return 1;
      } else if (a.points === b.points) {
        if (a.goalsDifference < b.goalsDifference) {
          return 1;
        } else if (a.goalsDifference === b.goalsDifference) {
          return (b.goalsFor - a.goalsFor);
        } else {
          return -1;
        }
      } else {
        return -1;
      }
    });
  resolve(teamsWithRanking);
});

/**
 * @description
 * - Calculate number of wins;
 * - Calculate number of drawns;
 * - Calculate number of losses;
 * - Calculate goals for;
 * - Calculate goals against;
 * - Calculate goals difference;
 * 
 * @param {Array} teams 
 * 
 * @returns {Array} teams - new Array of teams with the calculated values;
 */
const computeMatches = (teams) => new Promise((resolve, reject) => {
  let wins = 0;
  let drawns = 0
  let losses = 0;

  teams.map((team) => {
    team.goalsFor = 0;
    team.goalsAgainst = 0;
    team.goalsDifference = 0;

    wins = 0;
    drawns = 0;
    losses = 0;
    
    team.matches.forEach((match) => {      


      if (match.HomeTeam === team.name) {
        if (match.FTHG > match.FTAG) {
          wins++;
        } else if (match.FTHG === match.FTAG) {
          drawns++;
        } else {
          losses++
        }
        team.goalsFor += parseInt(match.FTHG);
        team.goalsAgainst += parseInt(match.FTAG);
        team.goalsDifference += parseInt(match.FTHG - match.FTAG);
      } else if (match.AwayTeam === team.name) {
        if (match.FTAG > match.FTHG) {
          wins++;
        } else if (match.FTHG === match.FTAG) {
          drawns++;
        } else {
          losses++
        }
        team.goalsFor += parseInt(match.FTAG);
        team.goalsAgainst += parseInt(match.FTHG);
        team.goalsDifference += parseInt(match.FTAG - match.FTHG);
      }
    });
    team.wins = wins;
    team.drawns = drawns;
    team.losses = losses;
    
    return team;
  });
  resolve(teams);
});

/**
 * 
 * @param {Array} teams 
 * @param {Array} matches 
 */
const groupTeamsByMatches = (teams, matches) => new Promise((resolve, reject) => {
  const matchesByTeam = [];
  teams.forEach((team) => {
    matchesByTeam.push({
      'matches': matches.filter((match) => match.AwayTeam === team.name || match.HomeTeam === team.name),
      'logo': team.logo,
      'name': team.name
    });
  });
  resolve(matchesByTeam);
});