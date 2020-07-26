import { combineReducers } from 'redux';
import tech_salaries_reducer from "./tech_salaries_reducer";
import {median_incomes, median_incomes_by_us_state} from "./median_incomes_reducer";
import county_names_reducer from "./county_names_reducer";
import us_topo_json_reducer from "./us_topo_json_reducer";
import us_state_names_reducer from "./us_state_names_reducer";
import filter_reducer from './filter_reducer';

export default combineReducers({
    tech_salaries: tech_salaries_reducer,
    median_incomes: median_incomes,
    median_incomes_by_us_state: median_incomes_by_us_state,
    county_names: county_names_reducer,
    us_topo_json: us_topo_json_reducer,
    us_state_names: us_state_names_reducer,
    filter: filter_reducer
});
