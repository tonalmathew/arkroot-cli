import inquirer from 'inquirer';
import * as constants from '../constants/constants';

export const promptForChoosingProject = async () => {
  const template = await inquirer.prompt({
    name: 'template',
    type: 'list',
    message: 'Please choose a starter template',
    choices: ['Javascript', 'TypeScript', 'Flutter'],
    default: constants.defaultTemplate,
  });
  return template;
};
