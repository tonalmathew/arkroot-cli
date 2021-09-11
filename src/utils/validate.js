'use strict';

import execa from 'execa';
import inquirer from 'inquirer';
import { isLinux, isWin } from '../constants/constants';
import Spinner from './spinner';

const spinner = new Spinner();

/**
 * Shows installation information
 *
 * @param {String} depCandidate - The repective package to be installed
 * @param {String} url - Official downloads page url
 * @returns {Void}
 */

const showInstallationInfo = (depCandidate, url) => {
  const msg = ` You need to download ${depCandidate} from the official downloads page: ${url}`;
  console.log(chalk.cyan.bold(msg));
  process.exit(0);
};

/**
 *
 * Install Git for supported platforms, else show installation instructions
 * @returns {Promise<void>}
 */

const installGit = () => {
  const url = 'https://git-scm.com/download/win';
  if (isWin) {
    return showInstallationInfo('git', url);
  }
  const packageMgr = isLinux ? 'apt' : 'brew';
  return exec(`${packageMgr} install git`);
};

/**
 *
 * @param {string} dependency
 * @returns {Promise<boolean>}
 */
const checkInstallationStatus = async (dependency) => {
  try {
    await execa.command(dependency);
    return true;
  } catch (error) {
    return false;
  }
};

export const validateInstallation = async (dependency) => {
  const isDepInstalled = checkInstallationStatus(dependency);

  if (dependency.includes(' ')) {
    const sep = dependency.includes('-') ? '-' : '';
    dependency = dependency.split(sep)[0];
  }

  if (!isDepInstalled) {
    const { shouldInstallDep } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'shouldInstallDep',
        message: `Sorry, ${dependency} is not installed on your system, Do you want to install it?`,
      },
    ]);

    if (!shouldInstallDep) {
      console.warn(
        chalk.yellow.bold(` Warning:- ${chalk.cyan.bold(
          `${dependency} is required to be installed`
        )}
        `)
      );
      process.exit(1);
    }

    spinner.text = `Installing ${dependency}`;
    spinner.start();

    if (dependency === 'git') {
      return installGit();
    }
  }
};
