import execa from 'execa';

let gitHelpers = {
  initGit: async (options) => {
    const result = await execa('git', ['init'], {
      cwd: options.targetDirectory,
    });
    if (result.failed) {
      return Promise.reject(new Error('Failed to initialize git'));
    }
    return;
  },
};

export default gitHelpers;
