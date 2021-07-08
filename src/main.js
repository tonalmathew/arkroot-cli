import fs from 'fs';
import chalk from 'chalk';
import path from 'path';
import { promisify } from 'util';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import Listr from 'listr';
import gitHelpers from './utils/git';
import * as filehelpers from './utils/filesHandling';

/* 

The [promisify] method defines in utilities module of Node.js standard library. 
It is basically used to convert a method that returns responses using a callback function
to return responses in a promise object. 

refer: https://www.geeksforgeeks.org/node-js-util-promisify-method/

*/

const access = promisify(fs.access);

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

  let newDirectory = path.join(options.targetDirectory, options.projectName);
  options.targetDirectory = newDirectory;

  // List of tasks that should be completed
  const tasks = new Listr([
    {
      title: 'Creating Project ',
      task: () => filehelpers.createDirectory(newDirectory),
    },
    {
      title: 'Generating project files',
      task: () => filehelpers.copyTemplateFiles(options),
    },
    {
      title: 'Initializing git',
      task: () => gitHelpers.initGit(options),
      enabled: () => options.git,
    },
  ]);

  await tasks.run().catch((err) => {
    console.error('%s failed to create folder', chalk.red.bold('ERROR'));
  });

  console.log('%s Project ready', chalk.green.bold('DONE'));

  return true;
};
