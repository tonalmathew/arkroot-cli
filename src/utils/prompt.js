import inquirer from 'inquirer';
import constants from '../constants/constants';

export const promptForMissingOptions = async (options) => {
  // if [skipPrompts] is true default template will be generated
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
      choices: ['Javascript', 'TypeScript', 'Flutter'],
      default: constants.defaultTemplate,
    });

    questions.push({
      type: 'input',
      name: 'projectName',
      message: 'Please type your project name',
      default: constants.defaultProjectName,
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
    projectName: answers.projectName || constants.defaultProjectName,
  };
};
