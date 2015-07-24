var xhr = require('xhr')
var assign = require('object-assign')
var urlWithQuery = require('./lib/url-with-query')
var noop = function(){}

module.exports = requestXHR
function requestXHR (url, opt, cb) {
  if (!url || typeof url !== 'string') {
    throw new TypeError('must specify a URL')
  }
  if (typeof opt === 'function') {
    cb = opt
    opt = {}
  }
  
  cb = cb || noop
  opt = assign({}, opt)
  url = urlWithQuery(url, opt.query)
  
  delete opt.uri
  opt.url = url
  xhr(opt, function (err, resp, body) {
    cb(err, body, resp)
  })
}