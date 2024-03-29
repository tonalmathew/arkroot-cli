'use strict';

import envinfo from 'envinfo';
import * as logger from '../../utils/logger';

export const fetchOSInfo = async () => {
  envinfo
    .run({
      System: ['OS', 'CPU'],
      Binaries: ['Node', 'Yarn', 'npm'],
      Browsers: ['Chrome', 'Edge', 'Firefox', 'Safari'],
      npmGlobalPackages: ['arkroot-cli'],
    })
    .then((env) => {
      logger.info(`\n  Environment Info: `);
      console.log(env);
    });
};
