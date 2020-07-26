import {FETCH_MEDIAN_INCOMES, FETCH_MEDIAN_INCOMES_BY_US_STATE} from "../actions/types";

const median_incomes = (state = {}, action) => {
    switch(action.type){
        case FETCH_MEDIAN_INCOMES:
            return {...state, ...action.payload};
        default:
            return state;
    }
};

const median_incomes_by_us_state = (state = {}, action) => {
    switch(action.type){
        case FETCH_MEDIAN_INCOMES_BY_US_STATE:
            return {...state, ...action.payload}
        default:
            return state;
    }
};

export {median_incomes, median_incomes_by_us_state};
