# got-xhr

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

## experimental

this is mostly an experiment, and will probably be dropped in favour of an existing module like `whatwg-fetch` or `superagent`

--

A tiny HTTP client for Node/Browser. Uses [got](https://www.npmjs.com/package/got) in Node and [xhr](https://www.npmjs.com/package/xhr) in the browser.

## Install

```sh
npm install got-xhr --save
```

## Example

```js
var request = require('got-xhr')
request('http://foo.com/some/api', {
  method: 'PUT',
  json: true,
  query: {
    sort: 'name'
  }
}, function (err, data) {
  if (err) throw err
  console.log("Got JSON result: ", data)
})
```

The body response defaults to text unless `json` or `responseType` options are specified.

## Motivation

There are a lot of HTTP clients, but most of them are Node-centric and lead to large browser bundles with builtins like `url`, `buffer`, `http`, `zlib`, etc. 

This bundles to 7kb after compression. Compare to 742kb for [request](https://www.npmjs.com/package/request), 153kb for [got](https://www.npmjs.com/package/got), and 25kb for [nets](https://www.npmjs.com/package/nets).

## Usage

[![NPM](https://nodei.co/npm/got-xhr.png)](https://www.npmjs.com/package/got-xhr)

#### `gotXhr(url, [opt], [callback])`

Sends a request to the given `url` with optional `opt` settings, triggering `callback` on complete.

Options:

- `query` (String|Object) the query parameters to append onto the URL
- `headers` (Object) the headers for the request
- `responseType` (String) can be `'text'`, `'arraybuffer'` or `'json'`, default text
- `json` (Boolean) whether to parse response as JSON (same as setting responseType to `json`)
- `body` (String) an optional body to send with request
- `method` (String) an optional method to use, defaults to `'GET'`
- `timeout` (Number) duration before timing out, default 0 (no timeout)

The `callback` is called with the arguments `(error, data, response)`

- `error` on success, will be null/undefined
- `data` the result of the request, either a JSON object, string, or `ArrayBuffer`
- `response` the request response, see below

The response object has the following form:

```js
{
  statusCode: Number,
  method: String,
  headers: {},     // lower-case keys
  url: String,
  rawRequest: xhr  // (browser only)
}
```

## See Also

- [xhr](https://www.npmjs.com/package/xhr)
- [got](https://www.npmjs.com/package/got)
- [nets](https://www.npmjs.com/package/nets)

## License

MIT, see [LICENSE.md](http://github.com/Jam3/got-xhr/blob/master/LICENSE.md) for details.
