'use strict';
const path = require('path');
const fs = require('fs');
const { cpuFree, freememPercentage } = require('os-utils');

const configPath = path.join(__dirname, 'config.js');
const { ports, hostname, spawnerName, disconnect } = require(configPath);

const workerPath = path.join(__dirname, 'worker.js');
const spawnerPath = path.join(__dirname, 'spawner', `${spawnerName}.js`);
const logCPU = path.join(__dirname, 'log', 'cpu.log');
const logMemory = path.join(__dirname, 'log', 'memory.log');

const { create } = require(spawnerPath);

console.log(`\n Clusterization based on ${spawnerName}! \n`);

const portsDisconnect = ports
  .sort(() => Math.random() - 0.5)
  .slice(0, disconnect);
const getRandom = (min, max) => Math.random() * (max - min) + min;

// run servers
ports.forEach(port => {
  const isDisconnect = portsDisconnect.indexOf(port) !== -1;
  const worker = create(workerPath, [port, hostname, isDisconnect]);

  worker.on('exit', code => {
    console.log('Worker exited with code:', code);
  });
  worker.on('message', msg => {
    console.log(msg.port);
    setTimeout(
      () => create(workerPath, [msg.port, hostname, false]),
      getRandom(4000, 10000)
    );
  });
});

// get CPU and memory usage
setInterval(() => {
  cpuFree(v => {
    logger(logCPU, `${v * 100},`);
    logger(logMemory, `${freememPercentage() * 100},`);
  });
}, 1000);

// logger
function logger(file, data) {
  const ws = fs.createWriteStream(file, { flags: 'a' }, 'utf-8');
  ws.write(data);
  ws.end();
}
