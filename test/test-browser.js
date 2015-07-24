var test = require('tape')
var request = require('../')

// Could improve automation for a test like this
// Maybe using a locally running node server

test('should xhr from api', function (t) {
  t.plan(7)

  var url = 'https://api.github.com/repos/mattdesl/budo/issues?state=open'
  request(url, {
    json: true,
    headers: {
      accept: 'application/vnd.github.v3+json'
    },
    query: {
      state: 'closed'
    }
  }, function (err, issues, resp) {
    if (err) return t.fail(err)
    t.equal(resp.url, 'https://api.github.com/repos/mattdesl/budo/issues?state=closed')
    t.equal(resp.statusCode, 200)
    t.equal(resp.headers['content-type'], 'application/json; charset=utf-8')
    t.equal(resp.method, 'GET')
    t.ok(resp.rawRequest, 'has raw XHR in browser')
    t.equal(Array.isArray(issues), true)
    t.equal(issues.every(function (issue) {
      return issue.state === 'closed'
    }), true)
  })
})

test('should respond with text by default', function (t) {
  t.plan(3)

  var url = 'https://api.github.com/repos/mattdesl/budo/issues?state=open'
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
