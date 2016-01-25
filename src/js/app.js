
var hljs = require('highlight.js');
hljs.configure({
  // tabReplace: '  ', // 4 spaces
})

hljs.initHighlightingOnLoad();

/////// Header

var d3 = require('d3');
var SvgFilter = require('svg-filter');
var size = 100;

var makeRect = function (selector) {
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
}

///// Header triangle

var penrose = d3.select('#penrose svg');


var filter = SvgFilter();

var convolve = filter
  .append('convolve')
      .attr('kernelMatrix', [0, 1, 0, 1, -4, 1, 0, 1, 0])
      .attr('preserveAlpha', false)
      .attr('bias', 0.5);


var blur = convolve
            .to('blur')
                .attr('stdDeviation', 3);

penrose.on('mouseenter', function() {
  convolve.attr('kernelMatrix', [0, 1, 0, 0, 1, 0, 0, 0, 1]).attr('bias', 0);
  blur.attr('stdDeviation', 0);
});

penrose.on('mouseleave', function() {
  convolve.attr('kernelMatrix', [0, 1, 0, 1, -4, 1, 0, 1, 0]).attr('bias', 0.5);
  blur.attr('stdDeviation', 3);
});


var clickCount = 0;
penrose.on('click', function() {
  var randomConvolveMatrix = [0, 1, 2, 3, 4, 5, 6, 7, 8].map(function(i) {
    var range = 3
    return Math.random() * range - range / 2;
  });

  convolve.attr('kernelMatrix', randomConvolveMatrix).attr('bias', Math.random());
});

penrose.attr('filter', filter);
d3.select('#penrose').transition().delay(500).style('opacity', 1);

//// Example 1
require('./examples/blur');


//
// //// Example 2

require('./examples/noise');


// Example 3
require('./examples/composite');



///// Example 4
require('./examples/flood-offset-merge');

///// Example 5
require('./examples/convolution');


///// Example 6
require('./examples/shadow');
