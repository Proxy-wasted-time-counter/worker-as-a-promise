import del from 'del';
import fs from './lib/fs';

/**
 * Cleans up the output (build) directory.
 */
async function clean() {
  fs.makeDir('build');
  await del(['.tmp', 'build/*', '!build/.git'], {dot: true});
}

export default clean;
