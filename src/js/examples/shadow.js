
var d3 = require('d3');
var SvgFilter = require('svg-filter');

var imW = 900 / 8;
var imH = 900 / 8;

var drawTiger = function (selector) {
  var margin = 20;
  return d3.select(selector)
            .append('svg')
                .attr('width', imW + margin)
                .attr('height', imH + margin)
              .append('image')
                  .attr('width', imW)
                  .attr('height', imH)
                  .attr('x', margin / 2)
                  .attr('y', margin / 2)
                  .attr('xlink:href', 'https://upload.wikimedia.org/wikipedia/commons/f/fd/Ghostscript_Tiger.svg');
}

var leftImage = drawTiger('.left.svg-example-6');
var rightImage = drawTiger('.right.svg-example-6')

var filter = new SvgFilter();



// Take the alpha channel of the original image,
// blur it, then offset it slightly
var blur = filter
            .append('blur')
                .in('SourceAlpha')
                .attr('stdDeviation', 2)
            // send to output of the blur
            // to the input of the offset
            .to('offset')
                .attr('dx', 4)
                .attr('dy', 6);

// Create a swatch of gray color
var flood = filter
              .append('flood')
                  .attr('color', '#777');


// Combine the blurred offset with the color we want. This
// is the 'drop shadow'
var composite = filter.composite(blur, flood).attr('operator', 'in');

// Combine the drop shadow with the
// original image
filter.merge(composite, 'SourceGraphic');


rightImage.attr('filter', filter);
