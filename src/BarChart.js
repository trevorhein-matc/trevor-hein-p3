import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const BarChart = props => {
  const ref = useRef(null);
  const cache = useRef(props.data);

  useEffect(() => {
    const data = props.data;
    const prevData = cache.current;
    const group = d3.select(ref.current);
    const groupWithData = group.selectAll("g.bar").data(data);
    let yScale;

    groupWithData.exit().remove();

    let xScale = d3
      .scaleBand()
      .domain(d3.range(data.length))
      .rangeRound([0, props.width])
      .paddingInner(0.1);

    yScale = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(data, function(d) {
          return d.points;
        })
      ])
      .range([0, props.height]);

    const groupWithUpdate = groupWithData
      .enter()
      .append("g")
      .attr("class", "bar");

    const bars = groupWithUpdate
      .append("rect")
      .merge(groupWithData.select("bars.bar"));

    bars
      .attr("class", "bar")
      .attr("fill", function(d) {
        return "rgb(0," + Math.round(d.points * 12) + ", 0)";
      })
      .attr("x", function(d, i) {
        return xScale(i);
      })
      .attr("y", function(d) {
        return props.height - yScale(d.points);
      })
      .attr("width", xScale.bandwidth())
      .attr("height", function(d) {
        return yScale(d.points);
      });

    const labels = groupWithUpdate
      .append("text")
      .merge(groupWithData.select("labels.label"));

    labels
      .text(function(d) {
        return d.points;
      })
      .attr("text-anchor", "middle")
      .style("fill", function(d) {
        if (d.points >= 15) {
          return "black";
        } else {
          return "white";
        }
      })
      .style("font-size", 12)
      .attr("font-family", "sans-serif")
      .attr("x", function(d, i) {
        return xScale(i) + xScale.bandwidth() / 2;
      })
      .attr("y", function(d) {
        return props.height - yScale(d.points) + 14;
      });

    if (prevData !== data) {
      // bars transitions
      group
        .selectAll("rect")
        .data(data)
        .transition()
        .attr("y", function(d) {
          return props.height - yScale(d.points);
        })
        .attr("height", function(d) {
          return yScale(d.points);
        })
        .attr("fill", function(d) {
          return "rgb(0," + Math.round(d.points * 10) + ", 0)";
        });

      // labels transitions
      group
        .selectAll("text")
        .data(data)
        .transition()
        .text(function(d) {
          return d.points;
        })
        .style("fill", function(d) {
          if (d.points >= 18) {
            return "black";
          } else {
            return "white";
          }
        })
        .attr("x", function(d, i) {
          return xScale(i) + xScale.bandwidth() / 2;
        })
        .attr("y", function(d) {
          return props.height - yScale(d.points) + 14;
        });
    }

    cache.current = props.data;
    // console.log(cache.current);
  }, [props.data]);

  return (
    <svg width={props.width} height={props.height}>
      <g ref={ref} />
    </svg>
  );
};

export default BarChart;
