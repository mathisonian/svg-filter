var d3 = require('d3-selection');
var filterMap = require('./filter-map.json');
var FilterComponent = require('./filter-component');
var filterCount = 0;
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

Filter.prototype.toString = function() {
  return 'url(#' + this.id + ')';
};

Filter.prototype.append = function(name) {
  if (filterMap.hasOwnProperty(name)) {
    // create a new filter component and add it...
    return new FilterComponent(this, name);
  } else {
    for (var key in filterMap) {
      if (filterMap.hasOwnProperty(key)) {
        if (filterMap[key] === name) {
          return new FilterComponent(this, name);
        }
      }
    }

    // if theres no match just fall back to a regular
    // d3 append
    return this.filter.append.apply(this.filter, arguments);
  }
};

Filter.prototype.attr = function() {
  if(arguments.length === 1) {
    return this.filter.attr.apply(this.filter, arguments);
  }
  this.filter.attr.apply(this.filter, arguments);
  return this;
}
