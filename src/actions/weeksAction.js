import Api from '../services/Api';
import {
    FETCH_WEEKS_LOADING,
    FETCH_WEEKS_SUCCESS,
    FETCH_WEEKS_ERROR,
    FETCH_RANKING_SUCCESS,
    FETCH_RANKING_PROGRESS,
    SELECT_WEEK
} from "./types";
import {
    getTeams
} from '../selectors/teamsSelector';

/**
 * @description
 * - Fetch the weeks on Premier League;
 * - Dispatch weeks to reducer;
 * - Compute goals for;
 * - Compute goals against;
 * - Compute goals difference;
 * - Compute wins;
 * - Compute drawns;
 * - Compute losses;
 * - Compute ranking table;
 * - Dispatch ranking to reducer;
 * 
 * @returns Promise
 */
export const fetch = () => (dispatch, getState) => {
    dispatch({ type: FETCH_WEEKS_LOADING });
    onProgressUpdate(dispatch, 'Loading games');
    new Api()
        .setType('weeks')
        .request()
        .then((weeks) => {
            dispatch({
                type: FETCH_WEEKS_SUCCESS,
                payload: weeks
            });
            dispatch({
                type: SELECT_WEEK,
                payload: (weeks.length - 1)
            });

            return groupTeamMatches(getTeams(), weeks);
        })
        .then((teamGames) => {
            onProgressUpdate(dispatch, 'Computing goals');
            return computeGoals(teamGames)
        })
        .then((teamGames) => {
            onProgressUpdate(dispatch, 'Computing results');
            return computeResults(teamGames);
        })
        .then((teamGames) => {
            onProgressUpdate(dispatch, 'Computing games');
            return computeRanking(teamGames)
        })
        .then((ranking) => {
            dispatch({
                type: FETCH_RANKING_SUCCESS,
                payload: ranking
            });
        })
        .catch((error) => {
            console.log(error);
            
            dispatch({
                type: FETCH_WEEKS_ERROR,
                payload: error.message
            });
        });
};

/**
 * @description
 * Group the team matches in array of a team
 * 
 * @param {Array} teams - Teams from API
 * @param {Array} weeks - Weeks from API
 * 
 * @returns
 * Array containing the team with his matches
 */
const groupTeamMatches = (teams, weeks) => teams.map((team, index) => {
    team.matches = [];
    weeks.forEach((week) => {
        let matches = week.filter((match) => match.teamIds.includes(index));
        if (matches.length > 0) {
            team.matches = team.matches.concat(matches);
        }
    });
    return team;
});

/**
 * @description
 * Compute the goals of each team
 * - Compute goals for;
 * - Compute goals against;
 * - Compute goals difference;
 * 
 * @param {Array} teams - Teams from API
 * 
 * @returns
 * Array containing the team with his goals;
 */
const computeGoals = (teams) => teams.map((team, index) => {
    team.goalsFor = 0;
    team.goalsAgainst = 0;

    team.matches.forEach((match) => {
        let teamIndex = (match.teamIds[0] === index) ? 0 : 1;
        let againstTeamIndex = (match.teamIds[0] === index) ? 1 : 0;

        team.goalsFor += match.score[teamIndex];
        team.goalsAgainst += match.score[againstTeamIndex];
    });
    team.goalsDifference = (team.goalsFor - team.goalsAgainst);

    return team;
});

/**
 * @description
 * Compute the results of each team
 * - Compute wins;
 * - Compute drawns;
 * - Compute losses;
 * 
 * @param {Array} teams - Teams from API
 * 
 * @returns
 * Array containing the team with his results;
 */
const computeResults = (teams) => teams.map((team, index) => {

    team.wins = 0;
    team.drawns = 0;
    team.losses = 0;

    team.matches.forEach((match) => {
        let teamIndex = (match.teamIds[0] === index) ? 0 : 1;
        let againstTeamIndex = (match.teamIds[0] === index) ? 1 : 0;
        
        if (match.score[teamIndex] > match.score[againstTeamIndex]) {
            team.wins++;
        } else if (match.score[teamIndex] === match.score[againstTeamIndex]) {
            team.drawns++;
        } else {
            team.losses++;
        }
    });
    return team;
});

/**
 * @description
 * Compute the ranking of each team
 * - Compute points;
 * - Sort the team by points (1 - Criteria);
 * - Sort the team by goals difference (2 - Criteria);
 * - Sort the team by goals for (3 - Criteria);
 * 
 * @param {Array} teams - Teams from API
 * 
 * @returns
 * Array containing the team with his points & sorted by criterias;
 */
const computeRanking = (teams) => teams.map((team) => {
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


const onProgressUpdate = (dispatch, progress) => {
    dispatch({
        type: FETCH_RANKING_PROGRESS,
        payload: progress
    });
};