'use strict';

const os = require('os');
const cpus = os.cpus().length;

class Server {
  constructor(serverModule, transport, spawner) {
    this.serverModule = serverModule;
    this.transport = transport;
    this.spawner = spawner;
  }

  start(options) {
    if (this.spawner.isMaster) {
      const apc = options.amountPerCore;
      const count = apc === 1 ? cpus : apc * cpus;

      for (let i = 0; i < count; i++) this.spawner.fork();
    } else {
      this.transport(this.serverModule, options);
    }
  }

  stop() {
    console.log('The server has stopped!');
    process.exit(0);
  }
}

module.exports = Server;
