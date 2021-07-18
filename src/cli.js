'use strict';

// Third party modules
import updateNotifier from 'update-notifier';
import leven from 'leven';
import chalk from 'chalk';

import init from './commands/init/index';
import * as logger from './utils/logger';
import { program } from './helpers/commander';
import pkg from '../package';
import { info } from './helpers/tasks';
import * as app from './utils/app';
import * as constants from './constants/constants';

updateNotifier({ pkg }).notify();

const suggestCommands = (cmd) => {
  const availableCommands = program.commands.map((c) => c._name);

  const suggestion = availableCommands.find(
    (c) => leven(c, cmd) < c.length * 0.4
  );

  if (suggestion) {
    logger.error(` Did you mean ${chalk.yellow(suggestion)}?`);
  }
};

program
  .description(constants.tagLine)
  .version(pkg.version)
  .usage('<command> [options]');

program
  .command('init <appname>')
  .description('Scaffolds a Flutter project in the current path')
  .action(init);

program
  .command('info')
  .description('Prints debugging information about the local environment')
  .action(info);

// Validation for unknown commands
program.on('command:*', ([cmd]) => {
  program.outputHelp();
  logger.error(`\n Unknown command ${chalk.yellow(cmd)}.\n`);
  suggestCommands(cmd);
  process.exitCode = 1;
});

program.parse(process.argv);

// Shows up help if no arguments were provided.
if (!program.args.length) {
  app.showIntroduction();
}
