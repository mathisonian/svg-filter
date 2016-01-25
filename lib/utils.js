module.exports = {
  getKeyFromMap: function (map, name) {
    if (map.hasOwnProperty(name)) {
      return name;
    } else {
      for (var key in map) {
        if (map.hasOwnProperty(key)) {
          if (map[key] === name) {
            return key;
          }
        }
      }
    }
  },
  getValFromMap: function (map, name) {
    return map[this.getKeyFromMap(name)];
  }
}
