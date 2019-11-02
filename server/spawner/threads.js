'use strict';

const { Worker, workerData, threadId } = require('worker_threads');

const port = workerData ? workerData[0] : workerData;
const hostname = workerData ? workerData[1] : workerData;
const isDisconnect = workerData ? workerData[2] : workerData;

const create = (modulePath, args) =>
  new Worker(modulePath, { workerData: args });

module.exports = { create, id: threadId, port, hostname, isDisconnect };
