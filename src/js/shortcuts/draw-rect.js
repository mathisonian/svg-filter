var d3 = require('d3');

var size = 100;

module.exports = function (selector) {
  return d3.select(selector)
      .append('svg')
          .attr('width', size * 2)
          .attr('height', size * 2)
        .append('rect')
            .attr('width', size)
            .attr('height', size)
            .attr('x', size / 2)
            .attr('y', size / 2)
            .attr('fill', 'blue');
};
