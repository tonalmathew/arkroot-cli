'use strict';

import execa from 'execa';

/**
 *
 * @param {Object} options - options
 * @returns {void}
 */

export const initGit = async(options) => {
    const result = await execa('git', ['init'], {
        cwd: options.targetDirectory,
    });
    if (result.failed) {
        return Promise.reject(new Error('Failed to initialize git'));
    }
    return;
};

/**
 *
 * @param {List} commands - commands
 * @returns {void}
 */

export const executeByOrder = (commands, { targetDirectory }) => {
    console.log(targetDirectory);
    // Execute commands serially
    commands.forEach((cmd) =>
        execa.sync('git', cmd.split(' '), { cwd: targetDirectory })
    );
};