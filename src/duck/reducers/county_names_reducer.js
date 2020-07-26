import {FETCH_COUNTY_NAMES} from "../actions/types";

export default (state = [], action) => {
    switch(action.type){
        case FETCH_COUNTY_NAMES:
            return [...state, ...action.payload];
        default:
            return state;
    }
};
