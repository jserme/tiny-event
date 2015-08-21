/* global describe it */
var evt = require('../')()
var assert = require('assert')
describe('tiny-event', function() {
  it('instance methods', function() {
    assert(typeof evt.on === 'function')
    assert(typeof evt.off === 'function')
    assert(typeof evt.fire === 'function')
  })
  it('on, fire', function(done) {
    var data = 123

    function listener(evtData) {
      assert(evtData === data)
      done()
    }

    evt.on('xx', listener)
    setTimeout(function() {
      evt.fire('xx', data)
    }, 10)
  })

  it('on, off', function(done) {
    var data = 123

    function listener() {
      data = 1
    }

    evt.on('xxx', listener)
    evt.off('xxx', listener)

    setTimeout(function() {
      evt.fire('xxx', data)
    }, 10)

    setTimeout(function() {
      assert(data === 123)
      done()
    }, 10)
  })
})
