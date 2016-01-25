var SvgFilter = require('svg-filter');

// This is the same drawRect function that was
// used in the blur example above.
var drawRect = require('../shortcuts/draw-rect');

leftRect = drawRect('.left.svg-example-2');
rightRect = drawRect('.right.svg-example-2');


filter = new SvgFilter();

filter
  .append('turbulence')
      .attr('type', 'turbulence')
      .attr('baseFrequency', 0.03)
      .attr('numOctaves', 5)
      .attr('width', 100)
      .attr('height', 100)
      .attr('x', 50)
      .attr('y', 50);

rightRect.attr('filter', filter);
