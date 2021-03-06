import path from 'path';
import replace from 'replace';
import Promise from 'bluebird';
import watch from './lib/watch';
import colors from 'colors/safe';

/**
 * Copies static files such as robots.txt, favicon.ico to the
 * output (build) folder.
 */
async function copy() {
  const ncp = Promise.promisify(require('ncp'));

  const watchedPaths = new Map([
    ['src/index.html', 'build/index.html'],
  ]);
  const promises = [];
  watchedPaths.forEach((dest, source) => {
    console.log('Copy %s to %s', source, dest);
    promises.push(ncp(source, dest).catch(e => console.error(e)));
  });
  await Promise.all(promises);

  if (global.WATCH) {
    const watchPattern = Array.from(watchedPaths.keys());
    console.log('[COPY] : Watch',  colors.green(watchPattern));
    const watcher = await watch(watchPattern);
    watcher.on('changed', async (file) => {
      console.log('[COPY] : File %s changed', file);
      ncp(file, `build/${path.basename(file)}`);
    });
  }
}

export default copy;
