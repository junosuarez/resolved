# resolved
a promises/a compliant `when`, but for objects instead of arrays

If your friends ask, this is why promises are cool: they're objects that you can pass around and do things to while you're waiting for their promised values. With `resolved`, you can embed promises in other objects and then get the aggregate resolved value.

This is similar to the function `when`, which takes an array of promises and returns a promise for an array of all of the resolved values. `resolved` does the same, but for objects instead of arrays.

## installation

    $ npm install resolved

## usage

    var resolved = require('resolved')

    var obj = {
      a: 'a regular value',
      b: promiseOfTrue
    }

    resolved(obj).then(function(resolvedObj) {
      // resolvedObj = {
      //    a: 'a regular value',
      //    b: true
      //  }
    })

## license
MIT
(c) 2012 jden - Jason Denizac <jason@denizac.org> - http://jden.mit-license.org/2012