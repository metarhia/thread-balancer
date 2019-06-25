module.exports = {
  settings: {
    transport: [
      {
        name: 'http',
        moduleName: 'http',
        load: true,
      },
      {
        name: 'tcp',
        moduleName: 'net',
        load: false,
      },
      {
        name: 'udp',
        moduleName: 'dgram',
        load: false,
      },
    ],
    //options
    spawner: [
      {
        name: 'processSpawner',
        amountPerCore: 1,
        nagle: true,
        load: true,
      },
      {
        name: 'threadSpawner',
        amountPerCore: 1,
        nagle: true,
        load: false,
      },
    ],
  },
  get transportOption() {
    return this.settings.transport.find(value => value.load);
  },
  get spawnerOption() {
    return this.settings.spawner.find(value => value.load);
  },
};
