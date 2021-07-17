'use strict';

import Listr from 'listr';

import * as logger from '../utils/logger';
import { fetchOSInfo } from '../commands/info';

export const info = async () => {
  let tasks = new Listr([
    {
      title: 'Fetching Environment Info',
      task: () => {
        return fetchOSInfo();
      },
    },
  ]);

  try {
    await tasks.run();
  } catch (error) {
    logger.error('Failed to fetch env info');
  }
};
