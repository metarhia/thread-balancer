'use strict';

module.exports = {
  ports: [3000, 3001, 3002, 3003],
  hostname: '127.0.0.1',
  spawnerName: 'processes', //processes, threads
  transportName: 'http', // http, tcp, udp
  disconnect: 1, // quantity
  delay: 20000,
};
