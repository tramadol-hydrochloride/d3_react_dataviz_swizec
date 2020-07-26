import * as d3 from "d3";

import CountyMap from './CountyMap';
import {useMemo} from "react";
import * as topojson from "topojson";
import _ from "lodash";

const county_value = (county, median_incomes, tech_salaries_map) => {
    const median_household = median_incomes[county.id];
    const salaries = tech_salaries_map[county.name];

    if (!median_household || !salaries) {
        return null;
    }

    const median = d3.median(salaries, d => d.base_salary);

    return {
        county_ID: county.id,
        value: median - median_household.median_income
    };
};

const useQuantize = (values) => {
    return useMemo(() => {
        const scale = d3.scaleQuantize().range(d3.range(9));

        if (values) {
            scale.domain([
                d3.quantile(values, 0.15, (d) => d.value),
                d3.quantile(values, 0.85, (d) => d.value),
            ]);
        }

        return scale;
    }, [values]);
}

const useProjection = ({width, height, zoom, usTopoJson, USstateNames}) => {
    return useMemo(() => {
        const projection = d3
            .geoAlbersUsa()
            .scale(1280)
            .translate([width / 2, height / 2])
            .scale(width * 1.3);
        const geoPath = d3.geoPath().projection(projection);

        if (zoom && usTopoJson) {
            const us = usTopoJson,
                USstatePaths = topojson.feature(us, us.objects.states).features,
                id = _.find(USstateNames, {code: zoom}).id;

            projection.scale(width * 4.5);

            const centroid = geoPath.centroid(_.find(USstatePaths, {id: id})),
                translate = projection.translate();

            projection.translate([
                translate[0] - centroid[0] + width / 2,
                translate[1] - centroid[1] + height / 2,
            ]);
        }

        return geoPath;
    }, [width, height, zoom, usTopoJson, USstateNames]);
}

export {CountyMap, county_value, useQuantize, useProjection};
