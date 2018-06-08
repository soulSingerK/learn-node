const http = require('http')
const zLib = require('zlib')
const fs = require('fs')

const ZIPHTMLPATH = './page/gzip.html'

const server = http.createServer((req, res) => {
  let acceptEncoding = req.headers['accept-encoding']
  let gZip

  if (acceptEncoding.indexOf('gzip') !== -1) {
    gZip = zLib.createGzip()
    res.writeHead(200, {
      'Content-Encoding': 'gzip'
    })
    fs.createReadStream(ZIPHTMLPATH).pipe(gZip).pipe(res)
  } else {
    fs.createReadStream(ZIPHTMLPATH).pipe(res)
  }
})

server.listen('4000')