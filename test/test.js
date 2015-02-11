var chai = require('chai')
chai.should()
var Promise = require('polyfill-promise').noConflict()

var resolved = require('../index')

describe('resolved', function () {

  it('fulfills a plain value that does not have any promises in its object graph', function (done) {
    var obj = {
      a: 1,
      b: '2',
      c: 0x3
    }
    resolved(obj).then(function (x) {
      x.should.deep.equal(obj);
    }).then(done, done)
  })

  it('doesnt choke on null', function (done) {
    var obj = {
      foo: null
    }

    resolved(obj).then(function (x) {
      x.should.deep.equal(obj);
    }).then(done, done)

  })

  it('resolves promise-properties of an object', function (done) {
    var obj = {
      foo: null,
      bar: 1,
      baz: Promise.resolve(true)
    }

    resolved(obj).then(function (x) {
      x.should.deep.equal({
        foo: null,
        bar: 1,
        baz: true
      })
    }).then(done, done)
  })

  describe('.deep', function () {
    it('example', function (done) {
    var travelPlans = {
      destination: Promise.resolve('Indonesia'),
      departure: new Date('June 4, 2013'),
      travelers: [
        'jden',
        Promise.resolve('a friend')
      ],
      accommodations: {
        hotel: 'nah',
        bungalow: Promise.resolve('right on')
      }
    }

    resolved.deep(travelPlans).then(function (travelPlans) {
      travelPlans.destination.should.equal('Indonesia')
      travelPlans.travelers.should.deep.equal(['jden','a friend'])
      travelPlans.accommodations.bungalow.should.equal('right on')
    }).then(done, done)

  })

  })

})