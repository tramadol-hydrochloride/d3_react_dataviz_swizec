import React from 'react';
import * as d3 from 'd3';
import {useD3} from '../D3blackbox'


const Axis = ({ x, y, scale, type = "Bottom" }) => {
    const gRef = useD3((anchor) => {
        const axis = d3[`axis${type}`](scale);

        d3.select(anchor).call(axis);
    });

    return <g transform={`translate(${x}, ${y})`} ref={gRef} />;
};

export default Axis;

