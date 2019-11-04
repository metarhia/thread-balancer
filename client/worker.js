'use strict';

const path = require('path');
const configPath = path.join(__dirname, 'config.js');

const { ports, hostname, connections, transportName } = require(configPath);
const transportPath = path.join(__dirname, 'transport', `${transportName}.js`);

const transport = require(transportPath);
const logPath = path.join(__dirname, 'log', `${transportName}`);

transport({ ports, hostname, connections, logFile: logPath });
