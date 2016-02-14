import {
  isMessageAsPromised,
  getMessage,
  createResponse,
  createError
} from 'worker-as-a-promise';

self.addEventListener('message', m => {
  if (isMessageAsPromised(m)) {
    echoAsPromised(m);
  } else {
    echo(m);
  }
});

function echo(m) {
  const timeout = (Math.random() * 3000) + 1;

  console.log('[WORKER] - This is not a message as promised :(', m.data);
  setTimeout(() => self.postMessage({message: m.data.message}), timeout);
}

function echoAsPromised(m) {
  const timeout = (Math.random() * 3000) + 1;

  const message = getMessage(m);
  console.log('[WORKER] - I got the message', message);
  const response = Math.random() > .5 ? createResponse(message) : createError(message);
  setTimeout(() => self.postMessage(response), timeout);
}
