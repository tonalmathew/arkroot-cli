import ncp from 'ncp';
import fs from 'fs';
import { promisify } from 'util';
/* 

The [promisify] method defines in utilities module of Node.js standard library. 
It is basically used to convert a method that returns responses using a callback function
to return responses in a promise object. 

refer: https://www.geeksforgeeks.org/node-js-util-promisify-method/

*/

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
