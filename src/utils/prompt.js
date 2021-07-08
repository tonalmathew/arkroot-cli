import inquirer from 'inquirer';

export const promptForMissingOptions = async (options) => {
  const defaultTemplate = 'Flutter';

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
