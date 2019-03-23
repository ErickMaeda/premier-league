import {
    FETCH_TEAMS
} from "../actions/types";

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_TEAMS:
            return action.payload;
        default:
            return state;
    }
};