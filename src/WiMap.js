import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const WiMap = props => {
    const ref = useRef(null);

    useEffect(() => {
        const mapData = props.mapData;
        const foodAssistData = props.foodAssistData;
        const w = props.width;
        const h = props.height;

        const group = d3.select(ref.current);

        const projection = d3.geoMercator()
            .translate([w/2, h/2])
            .scale([6500])
            .center([-89.727823, 44.435069]);

        const path = d3.geoPath()
            .projection(projection);

        const color = d3.scaleQuantize()
            .range(["rgb(237,248,233)","rgb(186,228,179)","rgb(116,196,118)","rgb(49,163,84)","rgb(0,109,44)"])
            .domain([ 0, 50 ]);

        if (mapData.length !== 0) {
            console.log("yup data")
        } else {
            console.log("no data yet")
        }

    // I may not have to pass the data through d3.json because it already is in json form

        // d3.json(mapData, function(foodData) {
        //     console.log(mapData)
        // })

        // d3.json(foodAssistData, function(foodData) {

        //     d3.json(mapData, function(error, json) {

        //         console.log(json);

        //         for (var i = 0; i < data.length; i++) {
        //             var dataTract = foodAssistDatadata[i].geoID;
        //             var dataValue = parseFloat(data[i].foodAssistPercent);

        //             for (var j = 0; j < json.features.length; j++) {
        //                 var jsonTract = json.features[j].properties.AFFGEOID;

        //                 if (dataTract === jsonTract) {
        //                     json.features[j].properties.foodAssistPercent = dataValue;
        //                     break;
        //                 }
        //             }
        //         }

        //         group.selectAll("path")
        //             .data(json.features)
        //             .enter()
        //             .append("path")
        //             .attr("d", path)
        //             .attr("stroke-width", .075)
        //             .attr("stroke", "black")
        //             .style("fill", function(d) {
        //                 var foodAssistPercent = d.properties.foodAssistPercent;
        //                 if (foodAssistPercent) {
        //                     return color(foodAssistPercent);
        //                 } else {
        //                     return "#c9ddff";
        //                 }
        //             })       
        //         })
        //     })
        })

    return (
        <svg width={props.width} height={props.height}>
            <g ref={ref} />
        </svg>
    );
};



export default WiMap;