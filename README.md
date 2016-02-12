# Worker-as-a-promise
## A WebWorker enhancer for communicate through a classical asynchronous promised base interface

### Example
```js
import { decorateWorker } from 'worker-as-a-promise';

const myWorker = new Worker('My/worker/script.js');
const worker = decorateWorker(myWorker);

// Comunicate using promise interface
worker.sendMessage({message: `Hii!`})
    .then(response => console.log('Message processed succesfully', response)
    .catch(responseError => console.error('Error processing message', responseError));

// Classical WebWorker interface still available
worker.postMessage({message: 'Message with classical interface'});
worker.addMessageListener(({data}) => {
  console.log('Response with classical interface', data);
});
```

Utilities functions are provided by **Worker-as-a-promise** for manage messages in a worker-as-a-promise
 -
 - isMessageAsPromised
 - getMessage
 - createMessage
 - createResponse
 - createError

For more informations about how Multithread-it should be used. Have a look to example: [Usage example](https://github.com/Proxy-wasted-time-counter/worker-as-a-promise/tree/master/examples)


