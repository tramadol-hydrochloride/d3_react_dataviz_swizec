import {csv, tsv} from 'd3-fetch';
import _ from 'lodash';

import {
    FETCH_TECH_SALARIES,
    FETCH_MEDIAN_INCOMES,
    FETCH_MEDIAN_INCOMES_BY_US_STATE,
    FETCH_COUNTY_NAMES,
    FETCH_US_TOPO_JSON,
    FETCH_US_STATE_NAMES,
    SET_YEAR_FILTER,
    SET_YEAR,
    SET_JOB_TITLE_FILTER,
    SET_JOB_TITLE,
    SET_US_STATE_FILTER,
    SET_US_STATE,
    SET_SALARY_FILTER
} from './types';

import {clean_salary, clean_incomes, clean_county_names, clean_us_state_names} from './data_handling';
import {h1bs, county_median_incomes, us_county_names, us_json, us_state_names_tsv} from './data_handling';


const fetch_map_data = () => async (dispatch) => {
    const [tech_salaries, median_incomes, county_names, us_state_names] = await Promise.all([
        csv(h1bs, clean_salary),
        csv(county_median_incomes, clean_incomes),
        csv(us_county_names, clean_county_names),
        tsv(us_state_names_tsv, clean_us_state_names)
    ]);

    let median_incomes_map = {};

    median_incomes
        .filter(d => _.find(county_names, {name: d['county_name']}))
        .forEach(d => {
            d['county_ID'] = _.find(county_names, {name: d['county_name']}).id;
            median_incomes_map[d.county_ID] = d;
        });

    dispatch({type: FETCH_TECH_SALARIES, payload: tech_salaries});
    dispatch({type: FETCH_MEDIAN_INCOMES, payload: median_incomes_map});
    dispatch({type: FETCH_MEDIAN_INCOMES_BY_US_STATE, payload: _.groupBy(median_incomes, 'us_state')});
    dispatch({type: FETCH_COUNTY_NAMES, payload: county_names});
    dispatch({type: FETCH_US_STATE_NAMES, payload: us_state_names});
    dispatch({type: FETCH_US_TOPO_JSON, payload: us_json});
};

const set_year_filter = (year_filter) => {
    return {
        type: SET_YEAR_FILTER,
        payload: year_filter
    };
};

const set_year = (year) => {
    return {
        type: SET_YEAR,
        payload: year
    };
};

const set_job_title_filter = (job_title_filter) => {
    return {
        type: SET_JOB_TITLE_FILTER,
        payload: job_title_filter
    };
};

const set_job_title = (job_title) => {
    return {
        type: SET_JOB_TITLE,
        payload: job_title
    };
};

const set_us_state_filter = (us_state_filter) => {
    return {
        type: SET_US_STATE_FILTER,
        payload: us_state_filter
    };
};

const set_us_state = (us_state) => {
    return {
        type: SET_US_STATE,
        payload: us_state
    };
};

const set_salary_filter = (salary_filter) => {
    return {
        type: SET_SALARY_FILTER,
        payload: salary_filter
    };
};

export {
    fetch_map_data, set_year_filter, set_year, set_job_title_filter, set_job_title, set_us_state_filter, set_us_state, set_salary_filter
};

// export const fetch_tech_salaries = () => async (dispatch) => {
//     const tech_salaries = await csv(h1bs, clean_salary);
//     dispatch({type: FETCH_TECH_SALARIES, payload: tech_salaries});
// };
//
// export const fetch_county_median_incomes = () => async (dispatch) => {
//     const [median_incomes, county_names] = await Promise.all([
//         csv(county_median_incomes, clean_incomes),
//         csv(us_county_names, clean_county_names)
//     ]);
//
//     let median_incomes_map = {};
//
//     median_incomes.filter(d => _.find(county_names, {name: d['county_name']}))
//         .forEach(d => {
//             d['county_ID'] = _.find(county_names, {name: d['county_name']}).id;
//             median_incomes_map[d.county_ID] = d;
//         });
//
//     dispatch({type: FETCH_MEDIAN_INCOMES, payload: median_incomes_map});
//     dispatch({type: FETCH_COUNTY_NAMES, payload: county_names});
// };
//
// export const fetch_us_topo_json = () => async (dispatch) => {
//     // const us_topo_json = await json(us_json)
//     dispatch({type: FETCH_US_TOPO_JSON, payload: us_json});
// };
//
// export const fetch_us_state_names = () => async (dispatch) => {
//     const us_state_names = await tsv(us_state_names_tsv, clean_us_state_names);
//     dispatch({type: FETCH_US_STATE_NAMES, payload: us_state_names});
// };
