import {
    FETCH_MATCHES_BY_TEAM
} from "../actions/types";

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_MATCHES_BY_TEAM:
            return action.payload;
        default:
            return state;
    }
};