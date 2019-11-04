'use strict';

module.exports = options => {
  const { ports, hostname, logFile } = options;
  const http = require('http');
  const fs = require('fs');

  const requester = port =>
    new Promise((resolve, reject) => {
      const settings = {
        hostname,
        port,
        path: '/',
        method: 'GET',
        headers: {
          'Content-Type': 'text/html; charset=UTF-8',
        },
      };

      const req = http.request(settings, res => {
        res.setEncoding('utf8');
        res.on('data', chunk => {
          resolve(chunk);
        });
      });

      req.on('error', e => {
        reject(e.message);
        // console.error(`problem with request: ${e.message}`);
      });

      req.end();
    });

  async function requesterAsync(port) {
    const TIME = 60000000001n;
    const start = process.hrtime.bigint();
    const log = `${logFile}_${port}.log`;

    let diff = 0n;
    let data = null;

    while (diff < TIME) {
      const end = process.hrtime.bigint();
      try {
        data = await requester(port);
      } catch (err) {
        // console.log(err);
      }

      diff = end - start;
    }
    // logger
    // console.log(data);
    logger(log, data);
  }

  function logger(file, data) {
    const ws = fs.createWriteStream(file, { flags: 'a' }, 'utf-8');
    ws.write(data);
    ws.on('finish', () => {
      console.log('Wrote log to file!');
    });
    ws.end();
  }

  // run on different ports
  ports.forEach(port => requesterAsync(port));
};
