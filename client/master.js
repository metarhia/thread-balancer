'use strict';

const { fork } = require('child_process');

const path = require('path');
const configPath = path.join(__dirname, 'config.js');
const workerPath = path.join(__dirname, 'worker.js');

const { concurrentConnection } = require(configPath);

for (let i = 0; i < concurrentConnection; i++) {
  fork(workerPath);
}
