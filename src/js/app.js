
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

withFilter.attr('filter', filter);



//// Example 3

noFilter = makeRect('.no-filter.svg-example-3');
withFilter = makeRect('.filter.svg-example-3');


var patternSVG = d3.select(document.createElement('div'))
                  .append("svg")
                      .attr('width', 100)
                      .attr('height', 200);

var pattern = patternSVG
  .append('defs')
    .append('pattern')
        .attr('id', 'pattern')
        .attr('patternUnits', 'userSpaceOnUse')
        .attr('width', 10)
        .attr('height', 10);

pattern
  .append('path')
  .attr('d', 'M0,8.239V10h1.761L0,8.239z');

pattern
  .append('path')
  .attr('d', 'M5,0l5,5l0,0V3.238L6.762,0H5z');

pattern
  .append('polygon')
  .attr('points', '0,3.239 0,5 5,10 6.761,10 ');

pattern
  .append('polygon')
  .attr('points', '1.762,0 0,0 10,10 10,8.238 ');

filter = new SvgFilter();

filter
  .append('image')
      .attr('xlink:href', 'data:image/svg+xml;charset=utf-8,' + encodeURI(patternSVG.node().outerHTML) + )
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', 100)
      .attr('height', 200)
  .append('tile')
  .append('composite')
      .attr('operator', 'xor')
      .in2('SourceGraphic');


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
