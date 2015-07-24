var test = require('tape')
var request = require('../')

// Could improve automation for a test like this
// Maybe using a locally running node server

test('should xhr from api', function (t) {
  t.plan(2)

  var url = 'https://api.github.com/repos/mattdesl/budo/issues?state=open'
  request(url, {
    json: true,
    headers: {
      accept: 'application/vnd.github.v3+json'
    },
    query: {
      state: 'closed'
    }
  }, function (err, issues) {
    if (err) return t.fail(err)
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
    try { issues = JSON.parse(body) }
    catch (e) { return t.fail(e) }
    
    t.equal(Array.isArray(issues), true)
    t.equal(issues.every(function (issue) {
      return typeof issue.state === 'string'
    }), true)
  })
})