import arg from 'arg';
import inquirer from 'inquirer';
import { createProject } from './main';

/* Function to parse cli arguments */

export const parseArgumentsIntoOptions = (rawArgs) => {
  /*     All parameters that aren't consumed by options
       (commonly referred to as "extra" parameters) are added to result._,
        which is always an array (even if no extra parameters are passed, in which case an empty array is returned).
   */

  const args = arg(
    {
      // Types
      '--git': Boolean,
      '--yes': Boolean,
      '--install': Boolean,

      // Aliases
      '-g': '--git',
      '-y': '--yes',
      '-i': '--install',
    },
    { argv: rawArgs.slice(2) }
  );

  return {
    skipPrompts: args['--yes'] || false,
    git: args['--git'] || false,
    template: args._[0],
    runInstall: args['--install'] || false,
  };
};

const promptForMissingOptions = async (options) => {
  const defaultTemplate = 'Flutter';

  if (options.skipPrompts) {
    return {
      ...options,
      template: options.template || defaultTemplate,
    };
  }

  // Questions list
  const questions = [];

  if (!options.template) {
    questions.push({
      type: 'list',
      name: 'template',
      message: 'Please choose which project template to use',
      choices: ['Javascript', 'TypeScript', ' Flutter'],
      default: defaultTemplate,
    });
  }

  if (!options.git) {
    questions.push({
      type: 'confirm',
      name: 'git',
      message: 'intialize git repository',
      default: false,
    });
  }

  const answers = await inquirer.prompt(questions);

  return {
    ...options,
    template: options.template || answers.template,
    git: options.git || answers.git,
  };
};

export const cli = async (args) => {
  let options = parseArgumentsIntoOptions(args);
  options = await promptForMissingOptions(options);
  await createProject(options);
};
