var SvgFilter = require('svg-filter');
var d3 = require('d3');

var makeText = function (selector) {
  return d3.select(selector)
            .append('svg')
                .attr('width', 200)
                .attr('height', 130)
              .append('text')
                  .text('text')
                  .attr('x', 100)
                  .attr('y', 110)
                  .style('font-size', 72)
                  .style('font-weight', 'bold')
                  .style('font-family', 'Work Sans')
                  .attr('text-anchor', 'middle');
};

var leftText = makeText('.left.svg-example-4');
var rightText = makeText('.right.svg-example-4');

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

var red = makeColoredFilter('#ff0000', 0, -12);
var green = makeColoredFilter('#00ff00', 0, -6);
var yellow = makeColoredFilter('#ffff00', 0, 0);
var blue = makeColoredFilter('#0000ff', 0, 6);

filter
  .merge(red, green, yellow, blue);

rightText
    .attr('filter', filter);
