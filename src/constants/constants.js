('use strict');

/**
 * @type {String} appName - App Name
 * @type {String} tagLine - Tagline for the app
 *
 */

export const appName = 'Arkroot-Cli';
export const tagLine = 'Faster way to setup your projects 🚀\n';

export const defaultTemplate = 'Flutter';
export const defaultProjectName = 'Project';

// Detecting host OS.
export const isWin = process.platform === 'win32';
export const isLinux = process.platform === 'linux';
export const isMac = process.platform === 'darwin';
