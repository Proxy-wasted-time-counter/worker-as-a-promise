import workerAsPromise from '../src';

import EchoWorker from 'worker!./echo-worker';

const worker = workerAsPromise(new EchoWorker());

for (let i = 0; i < 5; i++) {
  worker.sendMessage('test', {data: {message: `message ${i}`}})
    .then(response =>console.log(`response ${i}`, response));
}
