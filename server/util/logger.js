require('colors');
var _ = require('lodash');
var config = require('../config/config');


var noOperation = function(){};

var consoleLog = config.logging ? console.log.bind(console) : noOperation;

var logger = {
  log: function() {
    var args = _.toArray(arguments)
      .map(function(arg) {
        if(typeof arg === 'object') {
          var string = JSON.stringify(arg, null, 2);
          return string.cyan;
        } else {
          arg+='';
          return arg.cyan;
        }
      });
    console.log.apply(console, args);
  },

  error: function() {
    var args = _.toArray(arguments)
      .map(function(arg) {
        arg = arg.stack || arg;
        var name = arg.name || '[ERROR]';
        var log = name.yellow + ' ' + arg.red;
        return log;
      });
    console.log.apply(console, args);
  }

};

module.exports = logger;
