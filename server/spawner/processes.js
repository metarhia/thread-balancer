'use strict';

const { fork } = require('child_process');

const id = process.pid;
const port = parseInt(process.argv[2], 10);
const hostname = process.argv[3];

const create = (modulePath, args) => fork(modulePath, args);

module.exports = { create, id, port, hostname };
