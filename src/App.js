import React, {useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import _ from 'lodash';

import Preloader from "./components/Preloader";
import Histogram from './components/histogram';
import {CountyMap} from './components/county_map';
import {county_value} from './components/county_map';
import {fetch_map_data} from "./duck/actions";
import {Controls} from './components/controls';

import './App.css';

const App = () => {
    const tech_salaries = useSelector(state => state.tech_salaries);
    const median_incomes = useSelector(state => state.median_incomes);
    const county_names = useSelector(state => state.county_names);
    const us_topo_json = useSelector(state => state.us_topo_json);
    const us_state_names = useSelector(state => state.us_state_names);

    const salary_filter = useSelector(state => state.filter.salary_filter);
    const filtered_by_us_state = useSelector(state => state.filter.us_state);

    const dispatch = useDispatch();

    const filtered_salaries = tech_salaries.filter(salary_filter);
    const filtered_salaries_map = _.groupBy(filtered_salaries, 'county_ID');
    const county_values = county_names.map(county => county_value(county, median_incomes, filtered_salaries_map))
        .filter(d => !_.isNull(d));

    let zoom = filtered_by_us_state !== '*' ? filtered_by_us_state : null;

    useEffect(() => {
        dispatch(fetch_map_data());
    }, []);

    if (tech_salaries.length < 1) {
        return <Preloader/>;
    }

    return (
        <div className="App container">
            <svg width="1100" height="500">
                <CountyMap us_topo_json={us_topo_json}
                           us_state_names={us_state_names}
                           values={county_values}
                           x={0}
                           y={0}
                           width={500}
                           height={500}
                           zoom={zoom}/>

                <rect x="500" y="0" width="600" height="500" style={{fill: 'white'}}/>

                <Histogram bins={10}
                           width={500}
                           height={500}
                           x="500"
                           y="10"
                           data={filtered_salaries}
                           axis_margin={83}
                           bottom_margin={5}
                           value={d => d.base_salary}/>
            </svg>

            <Controls data={tech_salaries}/>
        </div>
    );
}

export default App;
