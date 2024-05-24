const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');

const port = 5000;
// const hostname = '127.0.0.1'
//
// http.createServer((req,res)=>{
//   res.writeHead(200,{'Content-Type':'text/plain'});
//   res.end('Hello World');
// }).listen(port,hostname,()=>{
//   console.log(`Server running at ${port} on http://${hostname}:${port}`);
// })

const mimeTypes = {
  'html':'text/html',
  'jpeg':'image/jpeg',
  'jpg':'image/jpg',
  'png':'image/png',
  'css':'text/css',
  'js':'text/javascript'
}

http.createServer((req,res)=>{
  var uri =url.parse(req.url).pathname;
  var filename = path.join(process.cwd(),unescape(uri));
  console.log('Loading '+uri);
  var stats;
  try {
    stats= fs.lstatSync(filename)
  } catch (e) {
    res.writeHead(404,{"Content-Type":'text/plain'});
    res.write('404 Not Found');
    res.end();
    return;
  }
  if(stats.isFile()){
    var mimeType = mimeTypes[path.extname(filename).split('.').reverse()[0]]
    res.writeHead(200,{'Content-Type':'mimeType'})

    var fileStream = fs.createReadStream(filename);
    fileStream.pipe(res)
  }else if (stats.isDirectory()) {
    res.writeHead(302,{
      'location':'index.html'
    })
    res.end()
  }else {
    res.writeHead(500,{'Content-Type':'text/plain'})
    res.write('500 internal error')
  }
}).listen(port,()=>console.log('Server started on port ',port))
