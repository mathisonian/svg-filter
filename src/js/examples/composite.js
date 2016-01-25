var SvgFilter = require('svg-filter');
var drawRect = require('../shortcuts/draw-rect');

leftRect = drawRect('.left.svg-example-3');
rightRect = drawRect('.right.svg-example-3');


filter = new SvgFilter();

var blurComponent = filter
                      .append('blur')
                          .attr('stdDeviation', 5);

var noiseComponent = filter
                      .append('turbulence')
                          .attr('type', 'turbulence')
                          .attr('baseFrequency', 0.03)
                          .attr('numOctaves', 5)
                          .attr('width', 100)
                          .attr('height', 100)
                          .attr('x', 50)
                          .attr('y', 50);


// composite the two effects
filter
  .composite(blurComponent, noiseComponent)
      .attr('operator', 'xor');

rightRect
    .attr('filter', filter);
