import {
    FETCH_MATCHES
} from "../actions/types";

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_MATCHES:
            return action.payload;
        default:
            return state;
    }
};