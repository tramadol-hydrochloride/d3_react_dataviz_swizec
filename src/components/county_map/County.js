import React from 'react';
import _ from 'lodash';

const choropleth_colors = _.reverse([
    'rgb(247,251,255)',
    'rgb(222,235,247)',
    'rgb(198,219,239)',
    'rgb(158,202,225)',
    'rgb(107,174,214)',
    'rgb(66,146,198)',
    'rgb(33,113,181)',
    'rgb(8,81,156)',
    'rgb(8,48,107)'
]);

const blank_color = 'rgb(240, 240, 240)';

const County = (props) => {
    const {value, geo_path, feature, quantize} = props;

    let color = value ? choropleth_colors[quantize(value)] : blank_color;

    return (
        <path d={geo_path(feature)}
              style={{fill: color}}
              title={feature.id}/>
    );
};

export default County;
