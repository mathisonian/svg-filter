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
                          .attr('width', 120)
                          .attr('height', 120)
                          .attr('x', 40)
                          .attr('y', 40);


// composite the two effects
filter
  .composite(blurComponent, noiseComponent);

rightRect
    .attr('filter', filter);
