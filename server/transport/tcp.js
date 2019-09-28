'use strict';

module.exports = options => {
  const net = require('net');

  const { port, hostname, id } = options;
  let count = 0;

  const connection = socket => {
    const memory = process.memoryUsage();

    // receive data
    socket.on('data', data => {
      count++;
      // send data
      socket.write(JSON.stringify({ port, workerId: id, count, memory }));
    });

    socket.on('error', e => {
      console.log(e.message);
    });
  };

  const server = net.createServer(connection);

  server.listen(port, hostname, () => {
    console.log(`Server has started: ${hostname}:${port}`);
  });
};
