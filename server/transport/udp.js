'use strict';

module.exports = options => {
  const dgram = require('dgram');
  const server = dgram.createSocket('udp4');

  const { port, hostname, id } = options;

  server.on('message', (msg, rinfo) => {
    console.log({ workerId: id });
    console.dir({ msg, rinfo });
  });

  server.on('error', err => {
    console.log(`server error:\n${err.stack}`);
    server.close();
  });

  server.bind(port, hostname, () => {
    console.log(`Server has started: ${hostname}:${port}`);
  });
};
