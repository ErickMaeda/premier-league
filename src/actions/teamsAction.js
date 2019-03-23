import {
    getTeams
} from "../configs/firebase";
import {
    FETCH_TEAMS
} from "./types";

const CURRENT_SEASON = '2018-2019';

/**
 * @description
 * - Fetch the teams on Premier League;
 * - Dispatch the data to reducer;
 * - Resolve promise;
 * 
 * @returns Promise
 */
export const fetch = () => async (dispatch) => new Promise((resolve, reject) => {
    getTeams(CURRENT_SEASON).onSnapshot((querySnapshot) => {
        const teams = [];
        querySnapshot.forEach((doc) => {
            teams.push(doc.data());
        });

        dispatch({
            type: FETCH_TEAMS,
            payload: teams
        });
        resolve(teams);
    });
});