#!/usr/bin/env node

const figlet = require('figlet');
const chalk = require('chalk');

console.clear();

console.log(
  chalk.yellow(figlet.textSync('Arkroot-Cli', { horizontalLayout: 'full' }))
);

require = require('esm')(module);
require('../src/cli').cli(process.argv);
