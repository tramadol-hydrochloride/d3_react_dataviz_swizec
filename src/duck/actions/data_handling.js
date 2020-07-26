import {timeParse} from "d3-time-format";
import _ from "lodash";

import h1bs from '../../assets/h1bs-2012-2016-shortened.csv'
import county_median_incomes from '../../assets/county-median-incomes.csv';
import us_county_names from '../../assets/us-county-names-normalized.csv';
import us_json from '../../assets/us.json';
import us_state_names_tsv from '../../assets/us-state-names.tsv';


export const clean_salary = (d) => {
    const date_parse = timeParse('%m/%d/%Y');

    if (!d['base salary'] || Number(d['base salary']) > 300000) {
        return null;
    }
    if (_.isNull(d)) {
        return null;
    }

    return {
        employer: d.employer,
        submit_date: date_parse(d['submit date']),
        start_date: date_parse(d['start date']),
        case_status: d['case status'],
        job_title: d['job title'],
        clean_job_title: d['job title'],
        base_salary: Number(d['base salary']),
        city: d['city'],
        us_state: d['state'],
        county: d['county'],
        county_ID: d['countyID']
    };
}

export const clean_incomes = (d) => {
    return {
        county_name: d['Name'],
        us_state: d['State'],
        median_income: Number(d['Median Household Income']),
        lower_bound: Number(d['90% CI Lower Bound']),
        upper_bound: Number(d['90% CI Upper Bound'])
    };
};

export const clean_county_names = ({id, name}) => {
    return {
        id: Number(id),
        name: name
    };
};

export const clean_us_state_names = (d) => {
    return {
        code: d.code,
        id: Number(d.id),
        name: d.name
    }
};

export {h1bs, county_median_incomes, us_county_names, us_json, us_state_names_tsv};
