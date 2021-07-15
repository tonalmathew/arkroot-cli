'use strict';

import fs from 'fs';
import chalk from 'chalk';
import path from 'path';
import { promisify } from 'util';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import Listr from 'listr';

import * as gitHelpers from '../git/index';
import * as filehelpers from '../../utils/filesHandling';

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

export const init = async(options) => {
    console.log(options);
};