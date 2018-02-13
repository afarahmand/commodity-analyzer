// import * as d3 from "d3";

// var data = [4, 8, 15, 16, 23, 42];
// var data = [
//   { x: 1, y: 15 },
//   { x: 2, y: 16 },
//   { x: 3, y: 10 },
//   { x: 4, y: 20 },
//   { x: 5, y: 15 },
//   { x: 6, y: 15 }
// ];

var data = [
  { x: 100, y: 100 },
  { x: 200, y: 300 },
  { x: 300, y: 200 }
];

data.push(data.last);

// Chart params
const lineColor = "red";
const lineWidth = "2";

const chartWidth = "800";
const chartHeight = "400";

// Adjust chart size, create main SVG group
d3.select(".chart")
  .attr("width", chartWidth)
  .attr("height", chartHeight)
  .append("g")
    .attr("id", "main-group");

// Adjust axes
// let xScale = d3.scale.linear()
//   .domain(0, data.length)
//   .range(0, chartWidth);

  // var x = d3.scale.linear()
  //     .domain([0, d3.max(data)])
  //     .range([0, 420]);


d3.select("g")
  .selectAll("line")
    .data(data.slice(0, data.length-2))
  .enter().append("line")
    .style("stroke", lineColor)
    .style("stroke-width", lineWidth)
    .attr("x1", function(d,i) {
      return (d["x"]).toString();
    })
    .attr("y1", function(d,i) {
      return (chartHeight-d["y"]).toString();
    })
    .attr("x2", function(d,i) {
      return (data[i+1]["x"]).toString();
    })
    .attr("y2", function(d,i) {
      return (chartHeight-data[i+1]["y"]).toString();
    });


// Line params
// const lineColor = "rgb(255,0,0)";

d3.select("#main-group")
  .attr("width", chartWidth)
  .attr("height", chartHeight);


//
// var x = d3.scale.linear()
//   .domain([1, data.last[0]])
//   .range([1, 6]);
//
// chart.selectAll("line")
//   .data(data)
//   .enter().append("line")
//     .style("stroke", lineColor)
//     .style("stroke-width", lineWidth)
//     .attr("x1", function(d,i) {
//       return (d[0]).toString();
//     })
//     .attr("y1", function(d,i) {
//       return (chartHeight-d[1]).toString();
//     })
//     .attr("x2", function(d,i) {
//       return (data[i+1][0]).toString();
//     })
//     .attr("y2", function(d,i) {
//       return (chartHeight-data[i+1][1]).toString();
//     });


// TUTORIAL

//
// var x = d3.scale.linear()
//     .domain([0, d3.max(data)])
//     .range([0, 420]);
//
// d3.select(".chart")
//   .selectAll("div")
//     .data(data)
//   .enter().append("div")
//     .style("width", function(d) { return x(d) + "px"; })
//     .text(function(d) { return d; });

// <line x1="0" y1="0" x2="200" y2="200"
//    style="stroke:rgb(255,0,0);stroke-width:2" />
