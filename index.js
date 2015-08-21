/* global define */
(function() {
  function factory() {
    var evt = {}
    var isType = function(type) {
      return function(o) {
        return toString.call(o) === '[object ' + type + ']'
      }
    }
    var isArray = isType('Array')

    var listeners = evt.__eventsListeners = {}

    evt.on = function(name, cb) {
      if (!listeners[name]) {
        listeners[name] = []
      }

      listeners[name].push(cb)
    }

    evt.fire = function(name, data) {
      //data can be object or an array
      if (listeners[name]) {
        listeners[name].forEach(function(v) {
          v.apply(null, isArray(data) ? data : [data])
        })
      }
    }

    evt.off = function(name, cb) {
      if (listeners[name]) {
        //if there is not a cb function provide, clean all listeners by name
        if (!cb) {
          delete listeners[name]
        } else {
          for (var i = 0; i < listeners[name].length; i++) {
            if (listeners[name][i] === cb) {
              listeners[name].splice(i, 1)
            }
          }
        }
      }
    }

    return evt
  }

  if (typeof module === 'object' && module.exports) {
    // CommonJS
    module.exports = factory
  } else if (typeof define === 'function' && define.amd) {
    // AMD modules
    define(function() {
      return factory
    })
  } else if (typeof define === 'function' && define.cmd) {
    // CMD modules
    define(function() {
      return factory
    })
  } else {
    window.tinyEvent = factory
  }
})()
