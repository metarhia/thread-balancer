'use strict';

module.exports = (serverModule, options) => {
  const server = serverModule.createServer((req, res) => {
    // if (req.url === "/favicon.ico") {
    //   res.writeHead(200, { "Content-Type": "image/x-icon" });
    //   res.end();
    //   return;
    // }

    // console.log(`$Request from ${req.headers.host}${req.url}`);

    console.log(options);
    res.end('Hello from HTTP server');
  });

  server.listen(8000, () => {
    console.log('HTTP server has started!');
  });
};
