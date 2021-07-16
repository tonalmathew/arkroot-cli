import ncp from 'ncp';
import fs from 'fs';
import { promisify } from 'util';

import * as logger from '../utils/logger';

const copy = promisify(ncp);
const mkdir = promisify(fs.mkdir);

export let createDirectory = async (newDirectory) => {
  mkdir(newDirectory).catch((err) => {
    console.error('%s failed to create folder', chalk.red.bold('ERROR'));
    process.exit(1);
  });
};

export const copyTemplateFiles = async (options) => {
  return copy(options.templateDirectory, options.targetDirectory, {
    clobber: false,
  });
};

export const checkIfAFolderExist = async (folderName) => {
  try {
    if (fs.existsSync(folderName)) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    logger.error('\nError: Something went wrong!!\n');
    return false;
  }
};

export const createDirectory = async (dirName) => {
  try {
    fs.mkdirSync(dirName);
    return true;
  } catch (error) {
    logger.error('\nError: Failed to create project folder!!\n');
    process.exit(1);
  }
};
