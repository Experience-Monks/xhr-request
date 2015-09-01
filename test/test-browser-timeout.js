var request = require('../')
var test = require('tape')

// need to find a proper way of automating this test

test('should timeout', function (t) {
  t.plan(1)
  t.timeoutAfter(2000)

  request('http://localhost:9010/', {
    timeout: 1000
  }, function (err) {
    if (err) t.ok(err instanceof Error, 'got an error on timeout')
    else t.fail('did not timeout')
  })
})

test('should cancel', function (t) {
  t.plan(1)
  t.timeoutAfter(2000)

  var req = request('http://localhost:9010/', function (err) {
    if (err) t.ok(err instanceof Error, 'got an error on cancel')
    else t.fail('did not cancel')
  })
  setTimeout(function () {
    req.abort()
  }, 1000)
})
