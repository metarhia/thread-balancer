'use strict';

module.exports = options => {
  const dgram = require('dgram');
  const server = dgram.createSocket('udp4');
  const memory = process.memoryUsage();

  const { port, hostname, id } = options;
  let count = 0;

  const debounce = (f, ms) => {
    let timeout;
    return function(...args) {
      const later = () => {
        timeout = null;
        f(args);
      };

      clearTimeout(timeout);
      timeout = setTimeout(later, ms);
      if (!timeout) f(args);
    };
  };

  const dataView = debounce(console.log, 500);

  server.on('message', msg => {
    count++;

    dataView({ port, workerId: id, count, memory });
  });

  server.on('error', err => {
    console.log(`server error:\n${err.stack}`);
    server.close();
  });

  server.bind(port, hostname, () => {
    console.log(`Server has started: ${hostname}:${port}`);
  });
};
