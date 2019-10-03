'use strict';

module.exports = options => {
  const dgram = require('dgram');

  const { ports, hostname } = options;

  const requester = port =>
    new Promise((resolve, reject) => {
      const message = Buffer.from('Hello');
      const client = dgram.createSocket('udp4');

      client.send(message, port, hostname, err => {
        if (err) {
          client.close();
          reject(err);
        }

        client.close();
        resolve();
      });
    });

  async function requesterAsync(port) {
    const TIME = 60000000001n;
    const start = process.hrtime.bigint();
    let diff = 0n;

    while (diff < TIME) {
      const end = process.hrtime.bigint();
      try {
        await requester(port);
      } catch (err) {
        console.log(err);
      }

      diff = end - start;
    }
  }

  ports.forEach(port => requesterAsync(port));
};
