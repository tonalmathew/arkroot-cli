import arg from 'arg';
import { createProject } from './main';
import * as prompts from './utils/prompt';

/* Function to parse cli arguments */

/*    
   
  All parameters that aren't consumed by options
  (commonly referred to as "extra" parameters) are added to result._,
  which is always an array (even if no extra parameters are passed, 
  in which case an empty array is returned).
   
  */

export const parseArgumentsIntoOptions = (rawArgs) => {
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

export const cli = async (args) => {
  let options = parseArgumentsIntoOptions(args);
  options = await prompts.promptForMissingOptions(options);
  await createProject(options);
};
