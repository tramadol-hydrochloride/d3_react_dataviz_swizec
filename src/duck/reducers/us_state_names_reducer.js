import {FETCH_US_STATE_NAMES} from "../actions/types";

export default (state = {}, action) => {
    switch(action.type){
        case FETCH_US_STATE_NAMES:
            return {...state, ...action.payload};
        default:
            return state;
    }
};
