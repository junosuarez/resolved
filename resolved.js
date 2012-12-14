var q = require('q');

function isPromise(x) {
  // use our best heuristic
  return typeof x === 'object' &&
          x.then &&
          typeof x.then === 'function';
}

module.exports = function resolved(obj) {
  var deferred = q.defer();

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

    if (isPromise(next)) {
      promises.push(next);
    } else {
      for(var key in next) {
        if (next.hasOwnProperty(key)) {
          stack.push(next[key]);
        }
      }
    }
  }

  // attach resolve handlers
  remaining = promises.length;
  promises.forEach(function (promise) {
    promise.then(function resolve(value) {
      // update in place
      promise = value;
      remaining--;
      if (remaining === 0) {
        deferred.resolve(obj);
      }
    }, function reject(err) {
      deferred.reject(err);
    });
  });

  // wait around a bit

  // return promise

  return deferred.promise;
};