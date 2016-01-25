var d3 = require('d3-selection');
var filterMap = require('./filter-map.json');
var FilterComponent = require('./filter-component');
var filterCount = 0;
var utils = require('./utils');
var defs;

function Filter() {
  if (!(this instanceof Filter)) {
    return new Filter();
  }

  this.id = 'svg-filter-' + filterCount++;

  if(!defs) {
    defs = d3.select('body').append('svg').attr('height', 0).append('defs');
  }

  this.filter = defs.append('filter');
  this.filter.attr('id', this.id);
}

module.exports = Filter;

Filter.prototype.toString = function () {
  return 'url(#' + this.id + ')';
};

Filter.prototype.append = function (name) {
  var key = utils.getKeyFromMap(filterMap, name);
  if (key) {
    return new FilterComponent(this.filter, key);
  }
  // if theres no match just fall back to a regular
  // d3 append
  return this.filter.append.apply(this.filter, arguments);
};

Filter.prototype.attr = function () {
  if(arguments.length === 1) {
    return this.filter.attr.apply(this.filter, arguments);
  }
  this.filter.attr.apply(this.filter, arguments);
  return this;
};


Filter.prototype.merge = function () {
  var mergeComponent = this.append('merge');
  for (var i=0; i < arguments.length; i++) {
    var arg = arguments[i];
    var node = mergeComponent.append('merge-node');
    node.in(arg);
  }
};


Filter.prototype.composite = function () {
  var compositeComponent = this.append('composite');
  return compositeComponent.in.apply(compositeComponent, arguments);
};
