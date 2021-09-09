'use strict';

import execa from 'execa';

/**
 *
 * @param {string} dependency
 * @returns {Promise<boolean>}
 */
const checkInstallationStatus = async (dependency) => {
  try {
    await execa.command(dependency);
    return true;
  } catch (error) {
    return false;
  }
};

export const validateInstallation = async (dependency) => {
  const isDepInstalled = checkInstallationStatus(dependency);

  if (dependency.includes(' ')) {
    const sep = dependency.includes('-') ? '-' : '';
    dependency = dependency.split(sep)[0];
  }
};
