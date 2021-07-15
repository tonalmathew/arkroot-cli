'use strict'

// Third party modules
import arg from 'arg';
import updateNotifier from 'update-notifier';
import envinfo from 'envinfo';
import leven from 'leven';
import chalk from 'chalk';

import { init } from './commands/init/index';
import * as prompts from './utils/prompt';
import * as logger from './utils/logger';
import { commander } from './helpers/commander';

import pkg from '../package'
import { program } from 'commander';




updateNotifier({ pkg }).notify();

const suggestCommands = (cmd) => {
    const availableCommands = commander.commands.map((c) => c._name, );

    const suggestion = availableCommands.find((c) => leven(c, cmd) < c.length * 0.4, );

    if (suggestion) {
        logger.error(` Did you mean ${chalk.yellow(suggestion)}?`);
    }
}

commander.version(pkg.version).usage('<command> [options]');


commander.command('init <appname>')
    .description('Scaffolds a Flutter project in the current path')
    .action(init);


commander
    .command('info')
    .description('Prints debugging information about the local environment')
    .action(() => {
        console.log(chalk.bold('\nEnvironment Info:'));
        envinfo
            .run({
                System: ['OS', 'CPU'],
                Binaries: ['Node', 'Yarn', 'npm'],
                Browsers: ['Chrome', 'Edge', 'Firefox', 'Safari'],
                npmGlobalPackages: ['arkroot-cli'],
            })
            .then(console.log);
    });


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


















// export const parseArgumentsIntoOptions = (rawArgs) => {
//   const args = arg(
//     {
//       // Types
//       '--git': Boolean,
//       '--yes': Boolean,
//       '--install': Boolean,

//       // Aliases
//       '-g': '--git',
//       '-y': '--yes',
//       '-i': '--install',
//     },
//     { argv: rawArgs.slice(2) }
//   );

//   return {
//     skipPrompts: args['--yes'] || false,
//     git: args['--git'] || false,
//     template: args._[0],
//     runInstall: args['--install'] || false,
//   };
// };

// export const cli = async (args) => {
//   let options = parseArgumentsIntoOptions(args);
//   options = await prompts.promptForMissingOptions(options);
//   await createProject(options);
// }