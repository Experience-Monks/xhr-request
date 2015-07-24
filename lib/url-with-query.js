var querystring = require('querystring')

module.exports = urlWithQuerystring
function urlWithQuerystring (url, query) {
  if (query) {
    if (typeof query !== 'string') {
      query = querystring.stringify(query)
    }
    var parts = url.split(/[\?\#]/)
    var start = parts[0]
    if (/\:\/\/[^\/]*$/.test(start)) {
      // e.g. http://foo.com -> http://foo.com/
      start = start + '/'
    }
    var match = url.match(/(\#.*)$/)
    url = start + '?' + query
    if (match) { // add hash back in
      url = url + match[0]
    }
  }
  return url
}