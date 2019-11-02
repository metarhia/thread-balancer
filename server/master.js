'use strict';
const path = require('path');
const configPath = path.join(__dirname, 'config.js');
const { ports, hostname, spawnerName, disconnect } = require(configPath);

const workerPath = path.join(__dirname, 'worker.js');
const spawnerPath = path.join(__dirname, 'spawner', `${spawnerName}.js`);

const { create } = require(spawnerPath);

console.log(`\n Clusterization based on ${spawnerName}! \n`);

const portsDisconnect = ports
  .sort(() => Math.random() - 0.5)
  .slice(0, disconnect);

ports.forEach(port => {
  const isDisconnect = portsDisconnect.indexOf(port) !== -1;
  const worker = create(workerPath, [port, hostname, isDisconnect]);

  worker.on('exit', code => {
    console.log('Worker exited with code:', code);
  });
});

setInterval(() => {
  console.log(process.memoryUsage());
}, 3000);
