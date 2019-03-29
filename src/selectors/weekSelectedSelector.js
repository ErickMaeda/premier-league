import {
    INITIAL_STATE
} from '../reducers/weekSelectedReducer';

export const data = (state) => state.weekSelected || INITIAL_STATE;