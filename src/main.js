import fs from 'fs';
import chalk from 'chalk';
import ncp from 'ncp';
import path from 'path';
import { promisify } from 'util';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

/* 

The [promisify] method defines in utilities module of Node.js standard library. 
It is basically used to convert a method that returns responses using a callback function
to return responses in a promise object. 

refer: https://www.geeksforgeeks.org/node-js-util-promisify-method/

*/

const access = promisify(fs.access);
const copy = promisify(ncp);

const copyTemplateFiles = async (options) => {
  return copy(options.templateDirectory, options.targetDirectory, {
    clobber: false,
  });
};

export const createProject = async (options) => {
  options = {
    ...options,
    targetDirectory: options.targetDirectory || process.cwd(),
  };

  const __dirname = dirname(fileURLToPath(import.meta.url));
  const currentFileUrl = __dirname;

  const templateDir = path.resolve(
    currentFileUrl,
    `..`,
    'templates',
    options.template.toLowerCase()
  );

  options.templateDirectory = templateDir;

  try {
    await access(templateDir, fs.constants.R_OK);
  } catch (err) {
    console.error('%s Invalid template name', chalk.red.bold('ERROR'));
    process.exit(1);
  }

  await copyTemplateFiles(options);

  console.log('%s Project ready', chalk.green.bold('DONE'));
  return true;
};
