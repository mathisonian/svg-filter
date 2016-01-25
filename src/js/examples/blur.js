var d3 = require('d3');
var SvgFilter = require('svg-filter');

// drawRect is just a function that uses d3
// to draw a blue rectangle on the screen.
var drawRect = function (selector) {
  var size = 100;
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


// both rectangles are drawn to the screen
var leftRect = drawRect('.left.svg-example-1')
var rightRect = drawRect('.right.svg-example-1');

//
// Now we will create a filter and add
// it to one of the rectangles.
//

// this instantiates a new filter object.
var filter = new SvgFilter();


// A filter won't do anything until you
// add an effect to it. In this case I add the
// `blur` effect and set its standard deviation
// parameter to 5
filter
  .append('blur')
      .attr('stdDeviation', 5);


// attach the filter to the rectangle on the right
rightRect.attr('filter', filter);
