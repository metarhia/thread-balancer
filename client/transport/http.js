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
        // console.log(`STATUS: ${res.statusCode}`);
        // console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
        res.setEncoding('utf8');
        res.on('data', chunk => {
          resolve(chunk);
          // console.log(`From server: ${chunk}`);
        });
        res.on('end', () => {
          // console.log('No more data in response.');
        });
      });

      req.on('error', e => {
        reject(e.message);
        console.error(`problem with request: ${e.message}`);
      });

      // Write data to request body
      // req.write(postData);
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
      // console.log(data);
      diff = end - start;
    }
    // logger
    console.log(data);
  }

  // run on different ports
  ports.forEach(port => requesterAsync(port));
};
