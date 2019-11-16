'use strict';

module.exports = options => {
  const { ports, hostname, logFile } = options;
  const net = require('net');
  const fs = require('fs');

  const TIME = 60000000001n;
  const logMinTime = 50000000000n;
  const logMaxTime = 50000999999n;

  const requesterAsync = port => {
    const socket = new net.Socket();
    const start = process.hrtime.bigint();
    const file = `${logFile}_${port}.log`;
    const dataArr = [];

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
          dataArr.push(data);
          logger(file, data);
        }
      } else {
        // logging after 60s
        dataArr.push(data, '>----separator----<');
        logger(file, dataArr.join(','));
      }

      diff = end - start;
    });

    socket.on('error', e => {
      console.log(e.message);
    });
  };

  async function logger(file, data) {
    return new Promise((resolve, reject) => {
      const ws = fs.createWriteStream(file, { flags: 'a' }, 'utf-8');
      ws.write(data);
      ws.on('finish', () => resolve('Wrote log to file!'));
      ws.on('error', e => reject(e));
      ws.end();
    });
  }

  ports.forEach(port => requesterAsync(port));
};
