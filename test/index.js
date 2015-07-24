var grab = require('../')
var test = require('tape')
var http = require('http')
var url = require('url')

test('json: true option', testJSON({ json: true }))
test('responseType: "json" option', testJSON({ responseType: 'json' }))

test('general put querystring request', function (t) {
  t.plan(7)

  var server = http.createServer(function (req, res) {
    setCORS(res)
    
    var parsed = url.parse(req.url, true)
    t.equal(parsed.query.path, 'beep/boop', 'query path')
    t.equal(parsed.query.contents, 'Kapow!', 'query contents')
    t.equal(parsed.pathname, '/foo', 'path name')
    t.equal(req.method, 'PUT', 'method')

    res.statusCode = 200
    var contents = JSON.stringify({ data: 'blah' })
    res.setHeader('content-type', 'application/json')
    res.setHeader('content-length', contents.length)
    res.end(contents)
  })
  server.on('error', t.fail.bind(t))
  server.listen(9021, 'localhost', function () {
    grab('http://localhost:9021/foo', {
      method: 'PUT',
      query: {
        path: 'beep/boop',
        contents: 'Kapow!'
      }
    }, function (err, body, resp) {
      if (err) t.fail(err)
      t.equal(resp.statusCode, 200)
      t.equal(resp.headers['content-type'], 'application/json')
      t.equal(body, JSON.stringify({ data: 'blah' }))
      server.close()
    })
  })
})

test('test arraybuffer', function (t) {
  t.plan(4)

  var array = [ 0, 15, 250, 32 ]

  var server = http.createServer(function (req, res) {
    res.statusCode = 200
    var contents = new Buffer(array)
    res.setHeader('content-type', 'application/octet-stream')
    res.setHeader('content-length', contents.length)
    setCORS(res)
    res.end(contents)
  })
  server.on('error', t.fail.bind(t))
  server.listen(9021, 'localhost', function () {
    grab('http://localhost:9021/foo', {
      responseType: 'arraybuffer'
    }, function (err, body, resp) {
      if (err) t.fail(err)
      t.equal(resp.statusCode, 200)
      t.equal(resp.headers['content-type'], 'application/octet-stream')

      var uint8 = new Uint8Array(body)
      t.deepEqual(uint8.length, 4, 'matches length')
      t.deepEqual(uint8, new Uint8Array(array), 'matches contents')
      server.close()
    })
  })
})

function testJSON (opt) {
  return function (t) {
    t.plan(3)

    var obj = { data: 'blah' }
    var server = http.createServer(function (req, res) {
      res.statusCode = 200
      var contents = JSON.stringify(obj)
      res.setHeader('content-type', 'application/json')
      res.setHeader('content-length', contents.length)
      setCORS(res)
      res.end(contents)
    })
    server.on('error', t.fail.bind(t))
    server.listen(9021, 'localhost', function () {
      grab('http://localhost:9021/foo', opt, function (err, body, resp) {
        if (err) t.fail(err)
        t.equal(resp.statusCode, 200)
        t.equal(resp.headers['content-type'], 'application/json')
        t.deepEqual(body, obj, 'matches JSON object')
        server.close()
      })
    })
  }
}

function setCORS (res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
  res.setHeader('Access-Control-Allow-Credentials', true)
}
