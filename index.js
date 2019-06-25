'use strict';

const { transportOption, spawnerOption } = require('./config');
const serverModule = require(transportOption.moduleName);
const transport = require(`./transport/${transportOption.name}`);
const spawner = require(`./spawner/${spawnerOption.name}`);
const Server = require('./server');

const server = new Server(serverModule, transport, spawner);

server.start(spawnerOption);
