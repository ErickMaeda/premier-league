import {
    SELECT_WEEK,
    SELECT_PREVIOUS_WEEK,
    SELECT_NEXT_WEEK
} from "../actions/types";

export const INITIAL_STATE = 1;

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SELECT_WEEK:
            return action.payload;
        case SELECT_PREVIOUS_WEEK:
            return (state - 1);
        case SELECT_NEXT_WEEK:
            return (state + 1);
        default:
            return state;
    }
};