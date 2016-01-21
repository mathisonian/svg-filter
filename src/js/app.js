
var hljs = require('highlight.js');
hljs.configure({
  tabReplace: '  ', // 4 spaces
})

hljs.initHighlightingOnLoad();

/////// Header

var d3 = require('d3');
var SvgFilter = require('svg-filter');
var size = 200;

var makeRect = function (selector) {
  return d3.select(selector)
      .append('svg')
          .attr('width', size)
          .attr('height', size)
        .append('rect')
            .attr('width', size)
            .attr('height', size)
            .attr('fill', 'blue');
}


//// Example 1

var noFilter = makeRect('.no-filter.svg-example-1')
var withFilter = makeRect('.filter.svg-example-1');

var filter = new SvgFilter();

filter
  .append('blur')
      .attr('stdDeviation', 50);

withFilter.attr('filter', filter);



//// Example 2

noFilter = makeRect('.no-filter.svg-example-2');
withFilter = makeRect('.filter.svg-example-2');



filter = new SvgFilter();

filter
  .append('turbulence')
      .attr('type', 'fractalNoise')
      .attr('baseFrequency', 0.1)
      .attr('numOctaves', 5)
      .attr('seed', 2);

//
//
//             .to('');
//
// var tile = filter
//               .append('tile')
//                   .attr('')
//
//

withFilter.attr('filter', filter);



//// Example 3

noFilter = makeRect('.no-filter.svg-example-3');
withFilter = makeRect('.filter.svg-example-3');

filter = new SvgFilter();


filter
  .append('image')
      .attr('xlink:href', 'data:image/svg+xml;charset=utf-8,%3Csvg%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20width%3D%22100px%22%20height%3D%22200px%22%20%20%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3Cpattern%20id%3D%22pattern%22%20patternUnits%3D%22userSpaceOnUse%22%20width%3D%2210%22%20height%3D%2210%22%3E%0A%20%20%20%20%20%20%3Cpath%20d%3D%22M0%2C8.239V10h1.761L0%2C8.239z%22%2F%3E%0A%20%20%20%20%20%20%3Cpath%20d%3D%22M5%2C0l5%2C5l0%2C0V3.238L6.762%2C0H5z%22%2F%3E%0A%20%20%20%20%20%20%3Cpolygon%20points%3D%220%2C3.239%200%2C5%205%2C10%206.761%2C10%20%22%2F%3E%0A%20%20%20%20%20%20%3Cpolygon%20points%3D%221.762%2C0%200%2C0%2010%2C10%2010%2C8.238%20%22%2F%3E%0A%20%20%20%20%3C%2Fpattern%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22url%28%23pattern%29%22%20%2F%3E%0A%3C%2Fsvg%3E')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', 100)
      .attr('height', 200)
  .append('tile')
  .append('composite')
      .attr('operator', 'in')
      .in2('SourceAlpha');


withFilter.attr('filter', filter);


///// Example 4

noFilter = makeRect('.no-filter.svg-example-4');
withFilter = makeRect('.filter.svg-example-4');

filter = new SvgFilter();

var blurComponent = filter
                      .append('blur')
                          .attr('stdDeviation', 50);

var noiseComponent = filter
                      .append('turbulence')
                          .attr('type', 'fractalNoise')
                          .attr('baseFrequency', 0.1)
                          .attr('numOctaves', 5)
                          .attr('seed', 2);

// composite the two filter components
filter
  .append('composite')
      // this sets `in` and `in2`
      // on 'compisite'
      .in(blurComponent, noiseComponent);

withFilter
    .attr('filter', filter);
