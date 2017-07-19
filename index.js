'use strict';

var _ = require('lodash');

var __find = function(value, items, data, options) {
  var found;
  var searchField = (options && options.searchField) ? options.searchField : 'key';
  items = (_.isArray(items)) ? items : [items];
  for (var i=0; i < items.length; i++) {

    if (items[i][searchField] === value) {
      return items[i];
    } else {
      var fields = [];
      if(options && options.children){
        fields = (_.isArray(options.children)) ? options.children : [options.children]; ;
      } else {
        fields = _.filter(Object.keys(items[i]), function (o) {
          return _.isArray(items[i][o])
        });
      }
      for(var j=0; j<fields.length; j++) {
        if(items[i][fields[j]]) {
          found = __find(value, items[i][fields[j]], data, options);
          if (found) {
            if (data) {
              data.push(found);
            } else {
              return found;
            }
          }
        }
      }
    }
  }
};

var find = function(value, items, options) {
  return __find(value, items, null, options);
};

var findAll = function(value, items, options) {
  var data = [];
  __find(value, items, data, options);
  return data;
};

module.exports = {
  find: find,
  findAll: findAll
};
