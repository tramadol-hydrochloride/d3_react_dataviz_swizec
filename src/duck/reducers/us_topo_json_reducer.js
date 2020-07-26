import {FETCH_US_TOPO_JSON} from "../actions/types";

export default (state = {}, action) => {
    switch(action.type){
        case FETCH_US_TOPO_JSON:
            return {...state, ...action.payload};
        default:
            return state;
    }
};