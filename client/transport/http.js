'use strict';

module.exports = options => {
  const { ports, hostname, logFile } = options;
  const http = require('http');
  const fs = require('fs');

  const TIME = 60000000001n;
  const logMinTime = 50000000000n;
  const logMaxTime = 50000999999n;


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

const requesterAsync = async port => {
    const start = process.hrtime.bigint();
    const file = `${logFile}_${port}.log`;
    const dataArr = [];

    let diff = 0n;
    let cache = '';

    while (diff < TIME) {
      const end = process.hrtime.bigint();
      try {
        cache = await requester(port);
      } catch (err) {
        // console.log(err);
      }

      diff = end - start;

      // logging after 50s
      if (diff < logMaxTime && diff > logMinTime) {
        dataArr.push(cache);
        logger(file, cache);
      }
    }
    // logging after 60s
    dataArr.push(cache, '>----separator----<');
    logger(file, dataArr.join(''));
  }

  async function logger(file, data) {
    return new Promise((resolve, reject) => {
      const ws = fs.createWriteStream(file, { flags: 'a' }, 'utf-8');
      ws.write(data);
      ws.on('finish', () => resolve('Wrote log to file!'));
      ws.on('error', e => reject(e));
      ws.end();
    });
  }

  // run on different ports
  ports.forEach(port => requesterAsync(port));
};
