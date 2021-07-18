import figlet from 'figlet';
import * as logger from './logger';
import constants from '../constants/constants';

/**
 * Shows application name
 * @return {void} -  returns nothing
 */

export const showIntroduction = async () => {
  console.log(
    figlet.textSync(constants.appName, {
      horizontalLayout: 'default',
      verticalLayout: 'default',
      whitespaceBreak: true,
    })
  );

  logger.info(`         ${constants.tagLine}`);
};
