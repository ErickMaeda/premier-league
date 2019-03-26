import Api from '../services/Api';
import {
    FETCH_TEAMS_LOADING,
    FETCH_TEAMS_SUCCESS,
    FETCH_TEAMS_ERROR
} from "./types";
import {
    getTeamShortName
} from '../helpers/TeamsUtils';

/**
 * @description
 * - Fetch the teams on Premier League;
 * - Add team logo for each team;
 * - Add team shortName for each team;
 * - Fetch the teams on Premier League;
 * - Dispatch the data to reducer;
 * 
 * @returns Promise
 */
export const fetch = () => (dispatch) => new Promise((resolve, reject) => {
    dispatch({ type: FETCH_TEAMS_LOADING });
    new Api()
        .setType('teams')
        .request()
        .then((teams) => addTeamLogo(teams))
        .then((teams) => addTeamShortName(teams))
        .then((teams) => {
            dispatch({
                type: FETCH_TEAMS_SUCCESS,
                payload: teams
            });
            resolve(teams);
        })
        .catch((error) => {
            dispatch({
                type: FETCH_TEAMS_ERROR,
                payload: error.message
            });
            reject(error);
        });
});

const addTeamLogo = (teams) => teams.map((team, index) => {        
    const logo = new Api()
        .setType('logos')
        .setId(index)
        .toString();
    return {
        name: team,
        logo
    };
});

const addTeamShortName = (teams) => teams.map((team, index) => {
    const shortName = getTeamShortName(index);
    return {
        ...team,
        shortName
    };
});