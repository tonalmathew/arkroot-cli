'use strict';

import fs from 'fs';
import chalk from 'chalk';
import path from 'path';
import { promisify } from 'util';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import figlet from 'figlet';
import Listr from 'listr';

import * as gitHelpers from '../git/index';
import * as filehelpers from '../../utils/filesHandling';
import * as logger from '../../utils/logger';

let projectPathRelative;

const access = promisify(fs.access);

/**
 * creates an initial commit
 *
 * @returns {void}
 */

const intialCommit = () => {
  // Commands to be executed serially
  const commands = ['init', 'add.', `commitn -m "Init" -m "ARKROOT-CLI"`];
  gitHelpers.executeByOrder(commands, projectPathRelative);
};

/**
 * Shows application name
 *
 * @param {msg} msg - App name
 * @return {void} -  returns nothing
 */

const showIntroduction = async (msg) => {
  console.log(
    figlet.textSync(msg, {
      horizontalLayout: 'default',
      verticalLayout: 'default',
      whitespaceBreak: true,
    })
  );
};

/**
 * Scaffolds flutter based app
 *
 * @param appName - specifies app name
 */

export default async (appName) => {
  showIntroduction(`Arkroot-Cli`);

  const argument = process.argv[4];

  const hasMultipleProjectNameArguments = argument && !argument.startsWith('-');
  console.log(hasMultipleProjectNameArguments);
};
