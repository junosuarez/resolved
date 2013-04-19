var Q = require('q');
var refcount = require('refcount')

function isThenable (x) {
  return typeof x === 'object' &&
         typeof x.then === 'function';
}

module.exports = function resolved (obj) {
  return Q.promise(function (resolve, reject) {

    var promises = []
      , counter
      , stack = [[{val: obj}, 'val']]
      , n
      , key
      , val
      , visited = [];

    // walk the object and stash all the promises
    while (n = stack.pop()) {
      key = n[1]
      val = n[0][key]
      if (visited.indexOf(val) >= 0) {
        // break cycles
        continue;
      }
      visited.push(val);

      if (isThenable(val)) {
        promises.push(n);
      } else {
        for(var key in val) {
          if (val.hasOwnProperty(key)) {
            stack.push([val, key]);
          }
        }
      }
    }

    // attach resolve handlers
    counter = refcount(promises.length);

    promises.forEach(function (p) {
      var key = p[1]
        , promise = p[0][key]
      promise.then(function resolve(value) {
        // update in place
        p[0][key] = value;
        counter.pop()
      }, reject)
    })

    counter.on('clear', function () {
      resolve(obj)
    })

  })

};