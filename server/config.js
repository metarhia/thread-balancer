'use strict';

module.exports = {
  ports: [3010, 3011, 3012, 3013],
  hostname: '127.0.0.1',
  spawnerName: 'processes', //processes, threads
  transportName: 'http', // http, tcp, udp
  disconnect: 2, // quantity
  delay: 5000,
};
