'use strict';

module.exports = options => {
  const http = require('http');
  const { port, hostname, id } = options;
  let count = 0;

  const requestLisntener = (req, res) => {
    const memory = process.memoryUsage();

    count++;
    res.end(JSON.stringify({ port, workerId: id, count, memory }));
  };

  const server = http.createServer(requestLisntener);

  server.listen(port, hostname, () => {
    console.log(`Server has started: ${hostname}:${port}`);
  });
};
