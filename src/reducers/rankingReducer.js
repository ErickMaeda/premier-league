import {
    FETCH_RANKING
} from "../actions/types";

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_RANKING:
            return action.payload;
        default:
            return state;
    }
};