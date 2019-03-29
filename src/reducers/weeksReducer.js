import {
    FETCH_WEEKS_LOADING,
    FETCH_WEEKS_ERROR,
    FETCH_WEEKS_SUCCESS
} from "../actions/types";

const INITIAL_STATE = {
    loading: false,
    error: null,
    data: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_WEEKS_LOADING:
            return {
                loading: true,
                error: null,
                data: []
            };
        case FETCH_WEEKS_ERROR:
            return {
                loading: false,
                error: action.payload,
                data: []
            };
        case FETCH_WEEKS_SUCCESS:
            return {
                loading: false,
                error: null,
                data: action.payload
            };
        default:
            return state;
    }
};