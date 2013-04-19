var q = require('q');
var resolved = require('./index');
var assert = require('assert');

var travelPlans = {
  destination: q.resolve('Indonesia'),
  departure: new Date('June 4, 2013'),
  travelers: [
    'jden',
    q.resolve('a friend')
  ],
  accommodations: {
    hotel: 'nah',
    bungalow: q.resolve('right on')
  }
};

var resolvedTravelPlans = {
  destination: 'Indonesia',
  departure: new Date('June 4, 2013'),
  travelers: [
    'jden',
    'a friend'
  ],
  accommodations: {
    hotel: 'nah',
    bungalow: 'right on'
  }
};
// travelPlans now has a bunch of promises in it

resolved(travelPlans).then(function (travelPlans) {
  // resolved returns a promise which is resolved
  // once all the promises in the object have been
  // resolved
  assert.deepEqual(travelPlans, resolvedTravelPlans);
});

// similarly, it rejects its promise as soon as any
// of the promises in the object is rejected

resolved({a: 1, b: q.reject(new Error(2))}).then(null, function(err) {
  // the reject handler is called
  assert.equal(err instanceof Error, true);
  assert.equal(err.message, 2);
});

console.log('all systems go')