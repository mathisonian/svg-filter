var filterCount = 0;
var filterMap = require('./filter-map.json');
var d3 = require('d3-selection');

function FilterComponent(filter, name) {
  if (!(this instanceof FilterComponent)) {
    return new FilterComponent(filter, name);
  }

  // Append to the D3 filter node
  // TODO - maybe check the name lookup..
  this.filter = filter;
  this.id = 'filter-component-' + filterCount++;
  this.filterComponent = filter.filter.append(filterMap[name]);

  // set in to SourceGraphic by default
  this.attr('result', this.id).in('SourceGraphic');

}

module.exports = FilterComponent;

FilterComponent.prototype.toString = function() {
  return this.id;
};


FilterComponent.prototype.in = function (filter1, filter2) {
  if(filter1) {
    if (typeof filter1 === 'string') {
      return this.attr('in', filter1);
    } else if (filter1 instanceof FilterComponent) {
      return this.attr('in', filter1.toString());
    }
  }

  if(filter2) {
    if (typeof filter2 === 'string') {
      return this.attr('in2', filter2);
    } else if (filter2 instanceof FilterComponent) {
      return this.attr('in2', filter2.toString());
    }
  }
};

FilterComponent.prototype.in2 = function (f) {
  if(f) {
    if (typeof f === 'string') {
      return this.attr('in2', f);
    } else if (filter instanceof FilterComponent) {
      return this.attr('in2', f.toString());
    }
  }
};

FilterComponent.prototype.to = function (name) {
  return new FilterComponent(this.filter, name).in(this);
};


FilterComponent.prototype.attr = function () {
  if(arguments.length === 1) {
      return this.filterComponent.attr.apply(this.filterComponent, arguments);
  }
  this.filterComponent.attr.apply(this.filterComponent, arguments);
  return this;
};

FilterComponent.prototype.append = function (name) {
  if (filterMap.hasOwnProperty(name)) {
    // create a new filter component and add it...
    return new FilterComponent(this.filter, name).in(this);
  } else {
    for (var key in filterMap) {
      if (filterMap.hasOwnProperty(key)) {
        if (filterMap[key] === name) {
          return new FilterComponent(this.filter, name).in(this);
        }
      }
    }

    // if theres no match just fall back to a regular
    // d3 append
    return this.filterComponent.append.apply(this.filterComponent, arguments);
  }
};
