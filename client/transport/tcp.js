'use strict';

module.exports = options => {
  const { ports, hostname, logFile } = options;
  const net = require('net');
  const fs = require('fs');

  const requesterAsync = port => {
    const socket = new net.Socket();

    const TIME = 60000000001n;
    const start = process.hrtime.bigint();
    const file = `${logFile}_${port}.log`;
    const logMinTime = 50000000000n;
    const logMaxTime = 50000999999n;

    let diff = 0n;

    socket.connect({ port, host: hostname }, () => {
      socket.write('Run!');
    });

    socket.on('data', data => {
      const end = process.hrtime.bigint();

      if (diff < TIME) {
        socket.write('Run!');

        // logging after 50s
        if (diff < logMaxTime && diff > logMinTime) {
          logger(file, data);
        }
      } else {
        // logging after 60s
        data += '>----separator----<';
        logger(file, data);
      }

      diff = end - start;
    });

    socket.on('error', e => {
      console.log(e.message);
    });
  };

  function logger(file, data) {
    const ws = fs.createWriteStream(file, { flags: 'a' }, 'utf-8');
    ws.write(data);
    ws.on('finish', () => {
      console.log('Wrote log to file!');
    });
    ws.end();
  }

  ports.forEach(port => requesterAsync(port));
};
