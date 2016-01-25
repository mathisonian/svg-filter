var SvgFilter = require('svg-filter');
var drawRect = require('../shortcuts/draw-rect');

var leftRect = drawRect('.left.svg-example-4');
var rightRect = drawRect('.right.svg-example-4');


var filter = new SvgFilter();
var makeColoredFilter = function(color, dx, dy) {
  return filter
          .append('flood')
              .attr('color', color)
              .attr('opacity', 0.5)
          // the `to` command creates a
          // new 'composite' effect and
          // automatically sends the output
          // of the flood effect to the input
          // of composite.
          .to('composite')
              .attr('operator', 'in')
              .in2('SourceAlpha') // shorthand for attr('in2', 'SourceAlpha')

          // again, this automatically wires the
          // output of composite to the input of a new
          // 'offset' effect
          .to('offset')
              .attr('dx', dx)
              .attr('dy', dy);
};

var red = makeColoredFilter('#ff0000', -15, 0);
var green = makeColoredFilter('#00ff00', -5, 10);
var blue = makeColoredFilter('#0000ff', 10, -15);
var yellow = makeColoredFilter('#ffff00', 5, 20);

filter
  .merge(red, green, blue, yellow);

rightRect
    .attr('filter', filter);
