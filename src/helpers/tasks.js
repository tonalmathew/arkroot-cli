'use strict';

import Listr from 'listr';

import * as logger from '../utils/logger';
import { fetchOSInfo } from '../commands/info';

export const info = async () => {
  console.log('\n');
  let tasks = new Listr([
    {
      title: 'Fetching Environment Info',
      task: async () => {
        return await fetchOSInfo();
      },
    },
  ]);

  try {
    await tasks.run();
  } catch (error) {
    logger.error('Failed to fetch env info');
  }
};
