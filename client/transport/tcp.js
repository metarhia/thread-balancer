'use strict';

module.exports = options => {
  const { ports, hostname } = options;
  const net = require('net');

  const requesterAsync = port => {
    const socket = new net.Socket();

    const TIME = 60000000001n;
    const start = process.hrtime.bigint();
    let diff = 0n;

    socket.connect({ port, hostname }, () => {
      socket.write('Run!');
    });

    socket.on('data', data => {
      const end = process.hrtime.bigint();

      if (diff < TIME) {
        socket.write('Run!');
      } else {
        console.log(data.toString());
      }

      diff = end - start;
    });

    socket.on('error', e => {
      console.log(e.message);
    });
  };

  ports.forEach(port => requesterAsync(port));
};
