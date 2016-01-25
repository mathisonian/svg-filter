var d3 = require('d3');
var SvgFilter = require('svg-filter');

var imW = 1456 / 8;
var imH = 1955 / 8;

var drawImage = function (selector) {
  return d3.select(selector)
            .append('svg')
                .attr('width', imW)
                .attr('height', imH)
              .append('image')
                  .attr('width', imW)
                  .attr('height', imH)
                  .attr('xlink:href', './images/llama.jpg');
}

var leftImage = drawImage('.left.svg-example-5');
var rightImage = drawImage('.right.svg-example-5')

var filter = new SvgFilter();

filter
  .append('convolve')
      .attr('kernelMatrix', [0, 1, 0, 1, -4, 1, 0, 1, 0])
      .attr('preserveAlpha', true)
      .attr('bias', 0);


rightImage.attr('filter', filter);
