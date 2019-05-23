import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import {Box, Flex} from 'rebass' 

const BarChart = props => {
  const ref = useRef(null);
  const cache = useRef(props.data);
  const axisCache = useRef(false);

  useEffect(() => {
    const data = props.data;
    const prevData = cache.current;
    const group = d3.select(ref.current);
    const groupWithData = group.selectAll("g.bar").data(data);
    const padding = 50;
    let yScale;
    let axisCheck = axisCache.current;

    console.log(data);

    groupWithData.exit().remove();

    let xScale = d3
      .scaleBand()
      .domain(d3.range(data.length))
      .rangeRound([padding, props.width - padding * 2])
      .paddingInner(0.1);

    let yMax = d3.max(data, function(d) {
      return d.points;
    });

    yScale = d3
      .scaleLinear()
      .domain([0, yMax])
      .range([0, props.height - padding * 2]);

    const yAxisScale = d3
      .scaleLinear()
      .range([props.height - padding * 2, 0])
      .domain([0, yMax]);

    //Axis
    //Define X axis
    const xAxis = d3
      .axisBottom()
      .scale(xScale)
      .ticks(5);

    //Define Y axis
    const yAxis = d3.axisLeft(yAxisScale);

    const groupWithUpdate = groupWithData
      .enter()
      .append("g")
      .attr("class", "bar");

    //On click handler for bars to display elements
    const moreInfo = function(d) {
      let gameWeek = "Week: " + d.week;
      let points = "Points: " + d.points;
      let matchResults = "Match Results: " + d.opponent;
      d3.select("#points").text(points);
      d3.select("#week").text(gameWeek);
      d3.select("#matchResults").text(matchResults);

      bars.attr("stroke-width", 0);

      d3.select(this)
        .attr("fill", "orange")
        .attr("stroke", "black")
        .attr("stroke-width", 3);
    };


    //bar elements
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
        return props.height - padding - yScale(d.points);
      })
      .attr("width", xScale.bandwidth())
      .attr("height", function(d) {
        return yScale(d.points);
      })
      .on("mouseover", function() {
        d3.select(this).attr("fill", "orange");
      })
      .on("mouseout", function() {
        d3.select(this)
          .transition()
          .duration(250)
          .attr("fill", function(d) {
            return "rgb(0," + Math.round(d.points * 12) + ", 0)";
          });
      })
      .on("click", moreInfo);

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
        return props.height - padding - yScale(d.points) + 14;
      });

    if (axisCheck === false) {
      group
        .append("g")
        .attr("id", "x-axis")
        .attr("transform", "translate(0," + (props.height - padding) + ")")
        .call(xAxis);

      group
        .append("g")
        .attr("id", "y-axis")
        .attr("transform", "translate(" + padding + "," + padding + ")")
        .call(yAxis);
    }

    if (prevData !== data) {
      // bars transitions
      group
        .selectAll("rect")
        .data(data)
        .transition()
        .attr("y", function(d) {
          return props.height - padding - yScale(d.points);
        })
        .attr("height", function(d) {
          return yScale(d.points);
        })
        .attr("fill", function(d) {
          return "rgb(0," + Math.round(d.points * 12) + ", 0)";
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
          if (d.points >= 15) {
            return "black";
          } else {
            return "white";
          }
        })
        .attr("x", function(d, i) {
          return xScale(i) + xScale.bandwidth() / 2;
        })
        .attr("y", function(d) {
          return props.height - padding - yScale(d.points) + 14;
        });

      var yAxisEl = group.select("#y-axis");

      yAxisEl.transition().call(yAxis);
    }

    cache.current = props.data;
    axisCache.current = true;
  }, [props.data]);

  return (
    <div>
      <Flex>
        <Box
          width={1/3}
        >
          <p id="week">Week Stats</p>
        </Box>
        <Box
          width={1/3}
        >
          <p id="points">Points</p>
        </Box>
        <Box
          width={1/3}
        >
          <p id="matchResults">Match Results</p>
        </Box>
      </Flex>
      <svg width={props.width} height={props.height}>
        <g ref={ref} />
      </svg>
    </div>
  );
};

export default BarChart;
