import {
    SET_YEAR_FILTER, SET_YEAR, SET_JOB_TITLE_FILTER, SET_JOB_TITLE, SET_US_STATE_FILTER, SET_US_STATE, SET_SALARY_FILTER
} from '../actions/types';

const INITIAL_STATE = {
    year_filter: () => true,
    year: '*',
    job_title_filter: () => true,
    job_title: '*',
    us_state_filter: () => true,
    us_state: '*',
    salary_filter: () => true
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_YEAR_FILTER:
            return {...state, year_filter: action.payload};
        case SET_YEAR:
            return {...state, year: action.payload};
        case SET_JOB_TITLE_FILTER:
            return {...state, job_title_filter: action.payload};
        case SET_JOB_TITLE:
            return {...state, job_title: action.payload};
        case SET_US_STATE_FILTER:
            return {...state, us_state_filter: action.payload};
        case SET_US_STATE:
            return {...state, us_state: action.payload};
        case SET_SALARY_FILTER:
            return {...state, salary_filter: action.payload};
        default:
            return state;
    }
};
