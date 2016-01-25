var filterCount = 0;
var filterMap = require('./filter-map.json');
var elementMap = require('./element-map.json');
var FilterComponent = require('./filter-component');
var d3 = require('d3-selection');
var utils = require('./utils');

function FilterComponentElement(filterComponent, name) {
  if (!(this instanceof FilterComponentElement)) {
    return new FilterComponentElement(filterComponent, name);
  }

  // TODO - check the name lookup..
  this.filterComponent = filterComponent.append(elementMap[name]);
}

module.exports = FilterComponentElement;


FilterComponentElement.prototype.in = function (filter1, filter2) {
  if(filter1) {
    if (typeof filter1 === 'string') {
      return this.attr('in', filter1);
    } else if (filter1 instanceof FilterComponent.constructor) {
      return this.attr('in', filter1.toString());
    }
  }

  if(filter2) {
    if (typeof filter2 === 'string') {
      return this.attr('in2', filter2);
    } else if (filter2 instanceof FilterComponent.constructor) {
      return this.attr('in2', filter2.toString());
    }
  }
};

FilterComponentElement.prototype.in2 = function (f) {
  if(f) {
    if (typeof f === 'string') {
      return this.attr('in2', f);
    } else if (filter instanceof FilterComponent) {
      return this.attr('in2', f.toString());
    }
  }
};



FilterComponentElement.prototype.attr = function () {
  if (arguments.length === 1) {
    return this.filterComponent.attr.apply(this.filterComponent, arguments);
  }
  this.filterComponent.attr.apply(this.filterComponent, arguments);
  return this;
};
