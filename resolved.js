var Q = require('q');

function isThenable (x) {
  return typeof x === 'object' &&
         typeof x.then === 'function';
}

module.exports = function resolved (obj) {
  return Q.promise(function (resolve, reject) {
    console.log('resolving', obj)
    var promises = []
      , remaining = 0
      , stack = [obj]
      , next
      , visited = [];

    // walk the object and stash all the promises
    while (next = stack.pop()) {
      if (visited.indexOf(next) >= 0) {
        // break cycles
        continue;
      }
      visited.push(next);

      if (isThenable(next)) {
        promises.push(next);
      } else {
        for(var key in next) {
          if (next.hasOwnProperty(key)) {
            stack.push(next[key]);
          }
        }
      }
    }
    console.log('foo')
    // attach resolve handlers
    remaining = promises.length;
    promises.forEach(function (promise) {
      promise.then(function resolve(value) {
        // update in place
        promise = value;
        remaining--;
        if (remaining === 0) {
          resolve(obj);
        }
      }, function reject(err) {
        reject(err);
      });
    });

  })

};