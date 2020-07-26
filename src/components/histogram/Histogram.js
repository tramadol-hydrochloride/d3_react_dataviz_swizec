import React from 'react';
import * as d3 from 'd3';

import HistogramBar from './HistogramBar';
import Axis from './Axis';


const Histogram = (props) => {
    const histogram = d3.histogram().thresholds(props.bins).value(props.value);
    const bars = histogram(props.data);
    const counts = bars.map((d) => d.length);

    const x_scale = d3
        .scaleLinear()
        .domain([d3.min(counts), d3.max(counts)])
        .range([0, props.width - props.axis_margin]);

    const y_scale = d3
        .scaleLinear()
        .domain([0, d3.max(bars, (d) => d.x1)])
        .range([props.height - props.y - props.bottom_margin, 0]);

    return (
        <g className="histogram" transform={`translate(${props.x}, ${props.y})`}>
            <g className="bars">
                {bars.map((bar) => (
                    <HistogramBar
                        percent={(bar.length / props.data.length) * 100}
                        x={props.axis_margin}
                        y={y_scale(bar.x1)}
                        width={x_scale(bar.length)}
                        height={y_scale(bar.x0) - y_scale(bar.x1)}
                        key={`histogram-bar-${bar.x0}`}
                    />
                ))}
            </g>
            <Axis
                x={props.axis_margin - 3}
                y={0}
                data={bars}
                scale={y_scale}
                type="Left"
            />
        </g>
    );
};

export default Histogram;
