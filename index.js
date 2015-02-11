var Promise = require('polyfill-promise').noConflict()
var refcount = require('refcount')

function isThenable (x) {
  return x !== null &&
         typeof x === 'object' &&
         typeof x.then === 'function'
}

module.exports = resolved
module.exports.deep = resolvedDeep

function resolved(obj) {
  var promises = []
  var val

  for (var key in obj) {
    val = obj[key]

    if (isThenable(val)) {
      promises.push(val)
    }
  }

  if (promises.length === 0) {
    return Promise.resolve(obj)
  }

  return Promise.all(promises).then(function (vals) {

    var out = {}
    var val

    for (var key in obj) {
      val = obj[key]

      if (isThenable(val)) {
        out[key] = vals[promises.indexOf(val)]
      } else {
        out[key] = val
      }
    }

    return out

  })

}



function resolvedDeep (obj) {
  return new Promise(function (resolve, reject) {

    var promises = []
    var counter
    var stack = [[{val: obj}, 'val']]
    var n
    var key
    var val
    var visited = []

    // walk the object and stash all the promises
    while (n = stack.pop()) {
      key = n[1]
      val = n[0][key]
      if (visited.indexOf(val) >= 0) {
        // break cycles
        continue
      }
      visited.push(val);

      if (isThenable(val)) {
        promises.push(n)
      } else {
        for(var key in val) {
          if (val.hasOwnProperty(key)) {
            stack.push([val, key])
          }
        }
      }
    }

    // attach resolve handlers
    counter = refcount(promises.length)

    promises.forEach(function (p) {
      var key = p[1]
      var promise = p[0][key]
      
      promise.then(function resolve(value) {
        // update in place
        p[0][key] = value
        counter.pop()
      }, reject)
    })

    counter.on('clear', function () {
      resolve(obj)
    })

    if (!counter.i) {
      // no constituent promises
      resolve(obj)
    }
  })

}