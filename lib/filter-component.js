var filterCount = 0;
var filterMap = require('./filter-map.json');
var elementMap = require('./element-map.json');
var d3 = require('d3-selection');
var utils = require('./utils');
var FilterComponentElement = require('./filter-component-element');
var shorthandMap = require('./component-attr-shorthand.json');

function FilterComponent(filter, name) {
  if (!(this instanceof FilterComponent)) {
    return new FilterComponent(filter, name);
  }

  // Append to the D3 filter node
  // TODO - maybe check the name lookup..
  this.filter = filter;
  this.id = 'filter-component-' + filterCount++;

  this.componentName = filterMap[name];
  this.filterComponent = filter.append(this.componentName);

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
  if (arguments.length === 1) {
    return this.filterComponent.attr.apply(this.filterComponent, arguments);
  }

  if (arguments.length) {
    if (shorthandMap[this.componentName] && shorthandMap[this.componentName][arguments[0]]) {
      arguments[0] = shorthandMap[this.componentName][arguments[0]];
    }
  }

  this.filterComponent.attr.apply(this.filterComponent, arguments);
  return this;
};

FilterComponent.prototype.append = function (name) {
  var key = utils.getKeyFromMap(elementMap, name);
  if (key) {
    return new FilterComponentElement(this.filterComponent, key);
  }

  // if theres no match just fall back to a regular
  // d3 append
  return this.filterComponent.append.apply(this.filterComponent, arguments);
};
