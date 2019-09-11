'use strict';
const path = require('path');
const configPath = path.join(__dirname, 'config.js');
const { ports, hostname, spawnerName } = require(configPath);

const workerPath = path.join(__dirname, 'worker.js');
const spawnerPath = path.join(__dirname, 'spawner', `${spawnerName}.js`);

const { create } = require(spawnerPath);

console.log(`\n Clusterization based on ${spawnerName}! \n`);

ports.forEach(port => create(workerPath, [port, hostname]));
