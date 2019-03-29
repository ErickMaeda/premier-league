import {
    FETCH_TEAMS_LOADING,
    FETCH_TEAMS_ERROR,
    FETCH_TEAMS_SUCCESS
} from "../actions/types";

const INITIAL_STATE = {
    loading: false,
    error: null,
    data: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_TEAMS_LOADING:
            return {
                loading: true,
                error: null,
                data: []
            };
        case FETCH_TEAMS_ERROR:
            return {
                loading: false,
                error: action.payload,
                data: []
            };
        case FETCH_TEAMS_SUCCESS:
            return {
                loading: false,
                error: null,
                data: action.payload
            };
        default:
            return state;
    }
};