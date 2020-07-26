import {FETCH_TECH_SALARIES} from "../actions/types";


export default (state = [], action) => {
    switch(action.type){
        case FETCH_TECH_SALARIES:
            return [...state, ...action.payload];
        default:
            return state;
    }
};
