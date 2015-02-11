# resolved
Like Promise.all but for Objects

If your friends ask, this is why Promises are cool: they're objects that you can pass around and do things to while you're waiting for their promised values. With `resolved`, you can embed promises in other objects and then get the aggregate resolved value.

This is similar to the function `when`, which takes an array of promises and returns a promise for an array of all of the resolved values. `resolved` does the same, but for objects instead of arrays.

## installation

```console
$ npm install resolved
```

## usage
```js
var resolved = require('resolved')

var obj = {
  a: 'a regular value',
  b: promiseOfTrue,
  c: [
    promiseOfFalse,
    promiseOf1
  ]
}

resolved(obj).then(function(resolvedObj) {
  // resolvedObj => {
  //    a: 'a regular value',
  //    b: true,
  //    c: [
  //      promiseOfFalse,
  //      promiseOf1
  //    ]
  //  }
})

resolved.deep(obj).then(function(resolvedObj) {
  // resolvedObj => {
  //    a: 'a regular value',
  //    b: true,
  //    c: [
  //      false,
  //      1
  //    ]
  //  }
})
```


## license
MIT
(c) 2015 jden - Jason Denizac <jason@denizac.org> - http://jden.mit-license.org/2015