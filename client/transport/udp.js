'use strict';

module.exports = options => {
  const { ports, hostname, connections } = options;
  const port = ports[0];

  const dgram = require('dgram');

  const message = Buffer.from('Hello');
  const client = dgram.createSocket('udp4');

  client.send(message, port, hostname, err => {
    if (err) {
      client.close();
      throw err;
    }

    client.close();
  });
};
