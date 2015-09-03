// for test-browser-timeout
// but may change with better automation

var http = require('http')

var server = http.createServer(function (req, res) {
  if (req.url === '/close') {
    console.error('closing')
    server.close()
  } else if (req.url === '/message') {
    console.error('message')
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.end('hello')
  }
})

server.listen(9010, 'localhost', function () {
  console.error('listening on http://localhost:9010/')
})
