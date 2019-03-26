import {
    FETCH_RANKING_PROGRESS,
    FETCH_RANKING_SUCCESS,
    FETCH_RANKING_ERROR,
    FETCH_WEEKS_ERROR
} from "../actions/types";

const INITIAL_STATE = {
    data: [],
    progress: null,
    error: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_RANKING_PROGRESS:
            return {
                data: [],
                progress: action.payload,
                error: null
            };
        case FETCH_RANKING_SUCCESS:
            return {
                data: action.payload,
                progress: null,
                error: null
            };
        case FETCH_WEEKS_ERROR:
        case FETCH_RANKING_ERROR:
            return {
                data: [],
                progress: null,
                error: action.payload
            };
        default:
            return state;
    }
};