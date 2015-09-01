// for test-browser-timeout
// but may change with better automation

var http = require('http')

var server = http.createServer(function (req) {
  if (req.url === '/close') {
    console.error('closing')
    server.close()
  }
})

server.listen(9010, 'localhost', function () {
  console.error('listening on http://localhost:9010/')
})
