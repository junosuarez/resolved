var chai = require('chai')
chai.should()
var Q = require('q')

var resolved = require('../index')

describe('resolved', function () {
  
  it('example', function (done) {
    var travelPlans = {
      destination: Q('Indonesia'),
      departure: new Date('June 4, 2013'),
      travelers: [
        'jden',
        Q('a friend')
      ],
      accommodations: {
        hotel: 'nah',
        bungalow: Q('right on')
      }
    }

    resolved(travelPlans).then(function (travelPlans) {
      travelPlans.destination.should.equal('Indonesia')
      travelPlans.travelers.should.deep.equal(['jden','a friend'])
      travelPlans.accommodations.bungalow.should.equal('right on')
    }).then(done, done)

  })



})