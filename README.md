# svg-filter
Tool for working with svg filters

See http://mathisonian.github.io/svg-filter for examples


![random filters](./img/tri.gif)

## example

```js

var d3 = require('d3');
var SvgFilter = require('svg-filter');


var filter = new SvgFilter();

filter
  .append('blur')
  .attr('stdDeviation', 50);

var size = 200;

d3.select('body')
    .append('svg')
      .attr('width', size)
      .attr('height', size)
    .append('rect')
      .attr('width', size)
      .attr('height', size)
      .attr('fill', 'blue')
      .attr('filter', filter);

```

## filter primitives 

The following are shorthand for the full element names. The links go to mozillas docs which do well to cover all inputs available to each filter type.

* [`'blend'`](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feBlend)
* [`'blur'`](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feGaussianBlur)
* [`'color'`](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feColorMatrix)
* [`'component-transfer'`](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feComponentTransfer)
* [`'composite'`](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feComposite)
* [`'convolve'`](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feConvolveMatrix)
* [`'diffuse'`](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feDiffuseLighting)
* [`'displacement'`](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feDisplacementMap)
* [`'flood'`](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feFlood)
* [`'image'`](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feImage)
* [`'merge'`](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feMerge)
* [`'morphology'`](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feMorphology)
* [`'offset'`](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feOffset)
* [`'specular'`](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feSpecularLighting)
* [`'tile'`](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feTile)
* [`'turbulence'`](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feTurbulence)
 

## API usage

### Basic 

#### 1. Create a new filter

```js
var SVGFilter = require('svg-filter');
var filter = new SVGFilter();
```

#### 2. Add effects to the filter

```js

// appends a blur effect
filter
  .append('blur');
```

#### 3. Attach the filter to a d3 selection

```js

d3selection.attr('filter', filter)'
```


### advanced

### Chain two effects together

```js
var filter = new SVGFilter();

// send the output of blur
// to the input of offset.
//
filter
  .append('blur')
  .to('offset')
      .attr('dx', 10)
      .attr('dx', 10);

```

### Merge separate effects


```js
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
```

