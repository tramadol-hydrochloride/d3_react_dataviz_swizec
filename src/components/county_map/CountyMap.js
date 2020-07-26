import React, {useEffect, useMemo} from 'react';
import * as d3 from 'd3';
import _ from 'lodash';
import * as topojson from 'topojson';

import County from './County';
import {useProjection, useQuantize} from "./index";


const CountyMap = (props) => {

    const geo_path = useProjection(props);
    const quantize = useQuantize(props.values);

    if (_.isEmpty(props.us_topo_json)) {
        return null;
    } else {
        const us = props.us_topo_json;
        const state_mesh = topojson.mesh(us, us.objects.states, (a, b) => a !== b);
        const counties = topojson.feature(us, us.objects.counties).features;
        const county_value_map = _.fromPairs(props.values.map(d => [d.county_ID, d.value]));

        return (
            <g transform={`translate(${props.x}, ${props.y})`}>
                {counties.map((feature) => (
                    <County geo_path={geo_path}
                            feature={feature}
                            zoom={props.zoom}
                            key={feature.id}
                            quantize={quantize}
                            value={county_value_map[feature.id]}/>
                ))}

                <path d={geo_path(state_mesh)}
                      style={{fill: 'none', stroke: '#fff', strokeLinejoin: 'round'}}/>
            </g>
        );
    }
};

export default CountyMap;
