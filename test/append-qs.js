var urlQuery = require('../lib/url-with-query')
var test = require('tape')

test('should append query string object', function (t) {
  run('http://foo.com/', { foo: 'bar' }, 'http://foo.com/?foo=bar')
  run('http://foo.com/?', { foo: 'bar' }, 'http://foo.com/?foo=bar')
  run('http://foo.com/?blah', { foo: 'bar' }, 'http://foo.com/?foo=bar')
  run('http://foo.com', { foo: 'bar' }, 'http://foo.com/?foo=bar')
  run('http://foo.com', 'foo=bar', 'http://foo.com/?foo=bar')
  run('http://foo.com', '', 'http://foo.com')
  run('http://foo.com/blah', { foo: 'bar' }, 'http://foo.com/blah?foo=bar')
  run('http://foo.com/blah/', { foo: 'bar' }, 'http://foo.com/blah/?foo=bar')
  run('http://foo.com/blah?asdf=123#home', { foo: 'bar' }, 'http://foo.com/blah?foo=bar#home')
  run('http://foo.com/blah/?asdf=123#home', { foo: 'bar' }, 'http://foo.com/blah/?foo=bar#home')
  t.end()
  function run(url, opt, expected, msg) {
    t.equal(urlQuery(url, opt), expected, msg)
  }
})
  
