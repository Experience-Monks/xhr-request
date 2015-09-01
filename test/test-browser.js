var test = require('tape')
var request = require('../')

test('should xhr from a JSON file', function (t) {
  t.plan(7)
  
  var url = '/test/fixture.json'
  setTimeout(function () {
    request(url, {
      json: true
    }, function (err, issues, resp) {
      if (err) return t.fail(err)
      t.equal(resp.url, '/test/fixture.json')
      t.equal(resp.statusCode, 200)
      t.equal(resp.headers['content-type'], 'application/json; charset=utf-8')
      t.equal(resp.method, 'GET')
      t.ok(resp.rawRequest instanceof XMLHttpRequest, 'has raw XHR in browser')
      t.equal(Array.isArray(issues), true)
      t.equal(issues.every(function (issue) {
        return issue.state === 'closed'
      }), true)
    })
  }, 1000)
    
})

test('should respond with text by default', function (t) {
  t.plan(3)

  var url = '/test/fixture.json'
  request(url, function (err, body) {
    if (err) return t.fail(err)
    t.equal(typeof body, 'string')
    var issues
    try { issues = JSON.parse(body) } catch (e) { return t.fail(e) }

    t.equal(Array.isArray(issues), true)
    t.equal(issues.every(function (issue) {
      return typeof issue.state === 'string'
    }), true)
  })
})

test('should error on invalid json', function (t) {
  t.plan(1)
  var url = '/test/fixture-error.json'
  request(url, { json: true }, function (err) {
    t.ok(err instanceof Error, 'got error')
  })
})

test('should error on invalid json', function (t) {
  t.plan(1)
  var url = '/test/fixture-error.json'
  request(url, { responseType: 'json' }, function (err) {
    t.ok(err instanceof Error, 'got error')
  })
})

test('should get array buffer', function (t) {
  t.plan(1)
  var url = '/test/fixture.json'
  request(url, {
    json: { foo: 'bar' },
    responseType: 'arraybuffer'
  }, function (err, data) {
    if (err) return t.fail(err)
    t.ok(data instanceof ArrayBuffer, 'matches ArrayBuffer')
  })
})
