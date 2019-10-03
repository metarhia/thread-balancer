'use strict';

module.exports = options => {
  const { ports, hostname } = options;
  const http = require('http');

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
        console.error(`problem with request: ${e.message}`);
      });

      req.end();
    });

  async function requesterAsync(port) {
    const TIME = 60000000001n;
    const start = process.hrtime.bigint();
    let diff = 0n;
    let data = null;

    while (diff < TIME) {
      const end = process.hrtime.bigint();
      try {
        data = await requester(port);
      } catch (err) {
        console.log(err);
      }

      diff = end - start;
    }
    // logger
    console.log(data);
  }

  // run on different ports
  ports.forEach(port => requesterAsync(port));
};
