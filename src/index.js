import { v4 as uuid } from 'node-uuid';

export default worker => {

  const hashMap = new Map();
  worker.onmessage = ({data}) => {
    const resolvePromise = hashMap.get(data.messageHash);
    if (resolvePromise) {
      resolvePromise(data);
      hashMap.delete(data.messageHash);
    }
  };
  return {
    sendMessage: (type, data) => {
      return new Promise((resolve, err) => {
        const messageHash = uuid();
        worker.postMessage({
          type,
          messageHash,
          data
        });
        hashMap.set(messageHash, resolve);
      });
    }
  };
};

