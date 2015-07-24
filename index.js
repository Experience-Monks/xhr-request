var assign = require('object-assign')
var request = require('got')
var toArrayBuffer = require('buffer-to-arraybuffer')
var responseTypes = ['text', 'arraybuffer', 'json']
var noop = function () {}

module.exports = grabJson
function grabJson (url, opt, cb) {
  if (!url || typeof url !== 'string') {
    throw new TypeError('must specify a URL')
  }
  if (typeof opt === 'function') {
    cb = opt
    opt = {}
  }

  cb = cb || noop
  opt = assign({ responseType: 'text' }, opt)

  var responseType = opt.responseType
  if (responseType && responseTypes.indexOf(responseType) === -1) {
    throw new TypeError('invalid responseType for Node: ' + responseType)
  }

  if (responseType === 'arraybuffer') {
    // ensure a Buffer is returned
    opt.encoding = null
  }

  delete opt.responseType
  request(url, opt, function (err, data, resp) {
    var isBuf = Buffer.isBuffer(data)
    if (isBuf || typeof data === 'string') {
      if (responseType === 'arraybuffer') {
        var buf = isBuf ? data : new Buffer(data)
        data = toArrayBuffer(buf)
      } else if (responseType === 'json') {
        try {
          data = JSON.parse(data.toString())
        } catch (e) {
          err = new Error('Failed to parse JSON ' + e.message)
        }
      } else { // text response
        data = data.toString()
      }
    }

    cb(err, data, {
      statusCode: resp.statusCode,
      headers: resp.headers,
      method: opt.method || 'GET',
      url: url
    })
  })
}
