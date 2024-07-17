
const http = require('http')

const fs = require('fs')

const path = require('path')

const server = http.createServer((req, res) => {

  const filePath = path.join(__dirname, decodeURIComponent(req.url))
  fs.stat(filePath, (err, stats) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' })
      res.end('<h1>404 Not Found</h1>')
      return;
    }

    if (stats.isDirectory()) {
      serveDirectory(filePath, req, res)
    } 
    
    else {
      serveFile(filePath, res)
    }
  });
});

function serveDirectory(dirPath, req, res) {
  fs.readdir(dirPath, (err, files) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/html' })
      res.end('<h1>500 Internal Server Error</h1>')
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.write('<html><head><title>Directory Listing</title></head><body>')
    res.write('<h1>Directory Listing</h1><ul>');
    files.forEach(file => {
      const fileStats = fs.statSync(path.join(dirPath, file))
      const icon = fileStats.isDirectory() ? '📁' : '📄';
      res.write(`<li>${icon} <a href="${path.join(req.url, file)}">${file}</a></li>`)
    });
    res.write('</ul></body></html>');
    res.end()
  });
}

function serveFile(filePath, res) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/html' })
      res.end('<h1>500 Internal Server Error</h1>')
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end(data)
  });
}

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
});
