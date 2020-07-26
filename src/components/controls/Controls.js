import React, {useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";

import ControlRow from "./ControlRow";
import {
    set_year,
    set_job_title,
    set_us_state,
    set_salary_filter,
    set_year_filter,
    set_job_title_filter, set_us_state_filter
} from '../../duck/actions';

const Controls = (props) => {
    const year_filter = useSelector(state => state.filter.year_filter);
    const year = useSelector(state => state.filter.year);
    const job_title_filter = useSelector(state => state.filter.job_title_filter);
    const job_title = useSelector(state => state.filter.job_title);
    const us_state_filter = useSelector(state => state.filter.us_state_filter);
    const us_state = useSelector(state => state.filter.us_state);

    const dispatch = useDispatch();

    useEffect(() => {
        let salary_filter = (d) => year_filter(d) && job_title_filter(d) && us_state_filter(d);

        dispatch(set_us_state(us_state));
        dispatch(set_job_title(job_title));
        dispatch(set_year(year));
        dispatch(set_salary_filter(salary_filter));
    }, [year, job_title, us_state, year_filter, job_title_filter, us_state_filter]);

    useEffect(() => {
        if (year !== '*' && year) {
            dispatch(set_year_filter(year_filter));
        }
        if(us_state !== '*' && us_state){
            dispatch(set_us_state_filter(us_state_filter));
        }
        if(job_title !== '*' && job_title){
            dispatch(set_job_title_filter(job_title_filter));
        }
    }, []);

    const update_year_filter = (year, reset) => {
        let filter = (d) => d.submit_date.getFullYear() === year;

        if (reset || !year) {
            filter = () => true;
            year = '*';
        }

        dispatch(set_year_filter(filter));
        dispatch(set_year(year));
    };

    const update_job_title_filter = (title, reset) => {
        let filter = (d) => d.clean_job_title === title;

        if (reset || !title) {
            filter = () => true;
            title = '*';
        }

        dispatch(set_job_title_filter(filter));
        dispatch(set_job_title(title));
    };

    const update_us_state_filter = (us_state, reset) => {
        let filter = (d) => d.us_state === us_state;

        if (reset || !us_state) {
            filter = () => true;
            us_state = '*';
        }

        dispatch(set_us_state_filter(filter));
        dispatch(set_us_state(us_state));
    };


    const data = props.data;
    const years = new Set(data.map(d => d.submit_date.getFullYear()));
    const job_titles = new Set(data.map(d => d.clean_job_title));
    const us_states = new Set(data.map(d => d.us_state));

    return (
        <div>
            <ControlRow data={data}
                        toggle_names={Array.from(years.values())}
                        picked={year}
                        update_data_filter={update_year_filter}/>

            <ControlRow data={data}
                        toggle_names={Array.from(job_titles.values())}
                        picked={job_title}
                        update_data_filter={update_job_title_filter}/>

            <ControlRow data={data}
                        toggle_names={Array.from(us_states.values())}
                        picked={us_state}
                        update_data_filter={update_us_state_filter}/>
        </div>
    );
};

export default Controls;
