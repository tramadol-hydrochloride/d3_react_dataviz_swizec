import * as d3 from 'd3';
import _ from 'lodash';

const clean_county_name = ({id, name}) => ({
    id: Number(id),
    name: name
});

const clean_incomes = d => ({
    county_name: d['Name'],
    us_state: d['State'],
    median_income: Number(d['Median Household Income']),
    lower_bound: Number(d['90% CI Lower Bound']),
    upper_bound: Number(d['90% CI Upper Bound'])
});

const date_parse = d3.timeParse('%m/%d/%Y');

const clean_salary = d => {

    if (!d['base salary'] || Number(d['base salary']) > 300000) {
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

const clean_US_state_name = d => ({
    code: d.code,
    id: Number(d.id),
    name: d.name
});

export const load_all_data = (callback = _.noop) => {

    Promise.all([
        d3.json('data/us.json'),
        d3.csv('data/us-county-names-normalized.csv', clean_county_name),
        d3.csv('data/county-median-incomes.csv', clean_incomes),
        d3.csv('data/h1bs-2012-2016-shortened.csv', clean_salary),
        d3.tsv('data/us-state-names.tsv', clean_US_state_name)
    ]).then(([us, county_names, median_incomes, tech_salaries, US_state_names]) => {

        let median_incomes_map = {};

        median_incomes
            .filter(d => _.find(county_names, {name: d['county_name']}))
            .forEach(d => {
                d['county_ID'] = _.find(county_names, {name: d['county_name']}).id;
                median_incomes_map[d.county_ID] = d;
            });

        tech_salaries = tech_salaries.filter(d => !_.isNull(d));

        callback({
            us_topo_json: us,
            county_names: county_names,
            median_incomes: median_incomes_map,
            median_incomes_by_county: _.groupBy(median_incomes, 'county_name'),
            median_incomes_by_US_state: _.groupBy(median_incomes, 'us_state'),
            tech_salaries: tech_salaries,
            us_state_names: US_state_names
        });
    });
}
