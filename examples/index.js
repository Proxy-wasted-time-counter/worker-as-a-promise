import { decorateWorker } from '../src';

import EchoWorker from 'worker!./echo-worker';

const worker = decorateWorker(new EchoWorker());

for (let i = 0; i < 5; i++) {
  worker.sendMessage({message: `message ${i}`})
    .then(response => console.log(`[MAIN] - Response ${i}`, response))
    .catch(responseError => console.error(`[MAIN] - Response ${i}`, responseError));

  worker.postMessage({message: `Classical message ${i}`});
}
worker.addMessageListener(data => {
  console.log('[MAIN] - Classical response', data);
});
