import {
    SELECT_WEEK,
    SELECT_PREVIOUS_WEEK,
    SELECT_NEXT_WEEK
} from "./types";

/**
 * @description
 * - Dispatch desired week to reducer;
 */
export const select = (week) => (dispatch) => {
    dispatch({
        type: SELECT_WEEK,
        payload: week
    });
};

/**
 * @description
 * - Back one week according to the current week selected on reducer;
 */
export const selectPreviousWeek = () => (dispatch) => {
    dispatch({
        type: SELECT_PREVIOUS_WEEK
    });
};

/**
 * @description
 * - Advance one week according to the current week selected on reducer;
 */
export const selectNextWeek = () => (dispatch) => {
    dispatch({
        type: SELECT_NEXT_WEEK
    });
};