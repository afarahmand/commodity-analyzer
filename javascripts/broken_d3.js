
// var data = [4, 8, 15, 16, 23, 42];
// var data = [
//   { x: 1, y: 15 },
//   { x: 2, y: 16 },
//   { x: 3, y: 10 },
//   { x: 4, y: 20 },
//   { x: 5, y: 15 },
//   { x: 6, y: 15 }
// ];


// svg #svg-chart1
//   g #g-main-group

var data = [
  { x: 100, y: 100 },
  { x: 200, y: 300 },
  { x: 300, y: 200 }
];
// Each line segment of line needs to know the coordinate of the next line
data.push(data[data.length-1]);

const MARGIN = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 20
};

// Chart params
const lineColor = "red";
const lineWidth = "1";

const chartWidth = "800";
const chartHeight = "400";

// Adjust chart size, create main SVG group
d3.select("#svg-chart1")
  .attr("width", chartWidth)
  .attr("height", chartHeight)
  .append("g")
    .attr("id", "g-main-group");



// let xAxis = d3.select("#svg-chart1").axis()
//   .scale(xRange)
//   .tickSize(5)
//   .tickSubdivide(true);
// let yAxis = d3.select("#svg-chart1").axis()
//   .scale(yRange)
//   .tickSize(5)
//   .orient('left')
//   .tickSubdivide(true);

          // let xAxis = d3.svg.axis()
          //           .scale(xRange)
          //           .tickSize(5)
          //           .tickSubdivide(true);
          // let yAxis = d3.svg.axis()
          //           .scale(yRange)
          //           .tickSize(5)
          //           .orient('left')
          //           .tickSubdivide(true);

// Adjust axes
let xRange = d3.scaleLinear()
  .range(MARGIN.left, chartWidth-MARGIN.right)
  .domain(data[0].x, data[data.length-2].x);

let yRange = d3.scaleLinear()
  .range(chartHeight-MARGIN.bottom, MARGIN.top)
  .domain(
    [d3.min(data, function(d) {
      return d.y;
    }),
    d3.max(data, function(d) {
      return d.y;
    })]);

let xAxis = d3.axisBottom(xRange)
  .ticks(5);

let yAxis = d3.axisLeft(yRange)
  .ticks(5);

d3.select("#g-main-group")
  .append("g")
    .attr('class', 'x-axis')
    .attr('transform', 'translate(0,' + (chartHeight - MARGIN.bottom) + ')')
    .call(xAxis);

// d3.select("#g-main-group")
//   .append("g")
//     .attr('class', 'y-axis')
//     .attr('transform', 'translate(' + (MARGIN.left) + ',0)')
//     .call(yAxis);


d3.select("#g-main-group")
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

// Selects the SVG w/the lines
d3.select("#g-main-group")
  .attr("width", chartWidth)
  .attr("height", chartHeight);
