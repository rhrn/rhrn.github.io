var Promise = require('bluebird');
var tasks = [];
var words = ['I', 'am', 'is', 'waterfall', 'promises'];

var parallel = [];
var waterfall = [];

var action = function(i) {
  return {
    exec: function() {
      return new Promise(function(resolve) {
        setTimeout(function() {
          resolve(i);
        }, ~~(Math.random() * 1000));
      });
    }
  };
}

for(var i = 0, len = words.length; i < len; i++) {
  tasks.push(action(words[i]));
};

var tasks2 = tasks.slice(0); // copy array

tasks2.forEach(function(a) {
  a.exec().then(function(x) {
    parallel.push(x);
    if (parallel.length === tasks.length) {
      console.log ('Parallel: %s', parallel.join(' '));
    }
  });
});

var first = tasks.shift();
var last = tasks.reduce(function(a, b) {
  return a.then(function(x) {
    waterfall.push(x);
    return b.exec();
  });
}, first.exec());

last.then(function(x) {
  waterfall.push(x);
  console.log ('Waterfall: %s', waterfall.join(' '));
});
