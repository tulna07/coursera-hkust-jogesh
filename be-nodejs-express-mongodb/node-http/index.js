const http = require("http");
const fs = require("fs");
const path = require("path");
const hostname = "localhost";
const port = 3000;

const server = http.createServer((req, res) => {
  console.log("Request for " + req.url + " by method " + req.method);

  if (req.method !== "GET") {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/html");
    res.end(
      `<html><body><h1>Error 404: ${get.method} not supported</h1></body></html>`
    );
    return;
  }

  let fileUrl = req.url;
  if (req.url === "/") {
    fileUrl = "/index.html";
  }

  const filePath = path.resolve("./public" + fileUrl);
  const fileEtx = path.extname(filePath);
  fs.exists(filePath, exists => {
    if (!exists || fileEtx !== ".html") {
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/html");
      res.end(
        `<html><body><h1>Error 404: ${fileUrl} not found</h1></body></html>`
      );
      return;
    }

    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});
