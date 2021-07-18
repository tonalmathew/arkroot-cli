'use strict';

// Third party modules
import updateNotifier from 'update-notifier';
import leven from 'leven';
import chalk from 'chalk';

import init from './commands/init/index';
import * as logger from './utils/logger';
import { commander } from './helpers/commander';
import pkg from '../package';
import { info } from './helpers/tasks';

updateNotifier({ pkg }).notify();

const suggestCommands = (cmd) => {
  const availableCommands = commander.commands.map((c) => c._name);

  const suggestion = availableCommands.find(
    (c) => leven(c, cmd) < c.length * 0.4
  );

  if (suggestion) {
    logger.error(` Did you mean ${chalk.yellow(suggestion)}?`);
  }
};

commander.version(pkg.version).usage('<command> [options]');

commander
  .command('init <appname>')
  .description('Scaffolds a Flutter project in the current path')
  .action(init);

commander
  .command('info')
  .description('Prints debugging information about the local environment')
  .action(info);

// Validation for unknown commands
commander.on('command:*', ([cmd]) => {
  commander.outputHelp();
  logger.error(`\n Unknown command ${chalk.yellow(cmd)}.\n`);
  suggestCommands(cmd);
  process.exitCode = 1;
});

commander.parse(process.argv);

// Shows up help if no arguments were provided.
if (!commander.args.length) {
  commander.help();
}
