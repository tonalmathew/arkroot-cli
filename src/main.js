import fs from 'fs';
import chalk from 'chalk';
import ncp from 'ncp';
import path from 'path';
import { promisify } from 'util';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import Listr from 'listr';
import execa from 'execa';


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

const initGit = async (options) => {
  const result = await execa('git', ['init'], {
    cwd: options.targetDirectory,
  });
  if (result.failed) {
    return Promise.reject(new Error('Failed to initialize git'));
  }
  return;
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

  // List of tasks that should be completed

  const tasks = new Listr([
    {
      title: 'Copy project files',
      task: () => copyTemplateFiles(options),
    },
    {
      title: 'Initialize git',
      task: () => initGit(options),
      enabled: () => options.git,
    },
  ]);

  await tasks.run();
  console.log('%s Project ready', chalk.green.bold('DONE'));

  return true;
};
