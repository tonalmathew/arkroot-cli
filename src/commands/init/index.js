'use strict';

import fs from 'fs';
import chalk from 'chalk';
import path from 'path';
import { promisify } from 'util';
import process from 'process';

import * as gitHelper from '../git/index';
import * as fsHelper from '../../utils/filesHandling';
import * as logger from '../../utils/logger';
import * as promptHelper from '../../utils/prompt';
import * as app from '../../utils/app';

let relativeProjPath;
let projectConfig = {};

/**
 * creates an initial commit
 *
 * @returns {void}
 */

const intialCommit = () => {
  // Commands to be executed serially
  const commands = ['init', 'add.', `commit -m "Init" -m "ARKROOT-CLI"`];
  gitHelper.executeByOrder(commands, projectPathRelative);
};

const fetchTemplate = async (config) => {
  await validateInstallation('git help -g');
};

/**
 * Scaffolds flutter based app
 *
 * @function {default} default function wrapping init functionality
 * @param {appName} appName - specifies app name
 */

export default async (appName) => {
  app.showIntroduction();

  const argument = process.argv[4];
  const hasMultipleProjectNameArguments =
    (argument && !argument.startsWith('-')) || false;
  let isCurrentDir = false;

  if (appName === '.') {
    isCurrentDir = true;
    appName = path.basename(process.cwd());
  }

  if (hasMultipleProjectNameArguments) {
    logger.error(
      '\nError: Please provide only one argument as the directory name!!'
    );
    process.exit(1);
  }

  if (isCurrentDir) {
    const files = fs.readdirSync('.');
    if (files.length) {
      logger.error(`\n It seems the current directory isn't empty 😟.\n`);
      process.exit(1);
    }
  }

  if (!isCurrentDir && (await fsHelper.checkIfAFolderExist(appName))) {
    logger.error(
      `\n Error: Directory ${chalk.cyan.bold(
        appName
      )} already exists in path😟!`
    );
    process.exit(1);
  }

  relativeProjPath = isCurrentDir ? '.' : appName;

  const { template } = await promptHelper.promptForChoosingProject();

  // Create a directory in the current path with the given name
  if (!isCurrentDir) {
    fs.mkdirSync(appName);
  }
  
  projectConfig.template = template;
  projectConfig.appName = appName;
};
