import {
  getSeason
} from "../configs/firebase";
import {
  FETCH_MATCHES
} from "./types";

const CURRENT_SEASON = '2018-2019';

/**
 * @description
 * - Fetch the matches data;
 * - Compute data to create a rank;
 * - Dispatch the data to reducer;
 */
export const fetch = () => async (dispatch, getState) => {
  getSeason(CURRENT_SEASON).on('value', async (snapshot) => {
    dispatch({
      type: FETCH_MATCHES,
      payload: snapshot.val()
    });
  });
};

const computeRanking = () => {

};