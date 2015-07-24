# got-xhr

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

A tiny JSON HTTP client for Node/Browser. Uses [got](https://www.npmjs.com/package/got) in Node and [xhr](https://www.npmjs.com/package/xhr) in the browser.

## Motivation

There are a lot of HTTP clients, but most of them are Node-centric and lead to large browser bundles with builtins like `url`, `buffer`, `http`, `zlib`, etc. 

This bundles to 7kb after compression. Compare to 742kb for [request](https://www.npmjs.com/package/request), 153kb for [got](https://www.npmjs.com/package/got), and 25kb for [nets](https://www.npmjs.com/package/nets).

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

## Usage

[![NPM](https://nodei.co/npm/got-xhr.png)](https://www.npmjs.com/package/got-xhr)



## See Also

- [xhr](https://www.npmjs.com/package/xhr)
- [got](https://www.npmjs.com/package/got)
- [nets](https://www.npmjs.com/package/nets)

## License

MIT, see [LICENSE.md](http://github.com/Jam3/got-xhr/blob/master/LICENSE.md) for details.
