
var d3 = require('d3');
var SvgFilter = require('svg-filter');


var filter = new SvgFilter();

filter
  .append('blur')
  .attr('stdDeviation', 50);

var size = 200;

d3.select('#svg-example-1')
    .append('svg')
      .attr('width', size)
      .attr('height', size)
    .append('rect')
      .attr('width', size)
      .attr('height', size)
      .attr('fill', 'blue')
      .attr('filter', filter);