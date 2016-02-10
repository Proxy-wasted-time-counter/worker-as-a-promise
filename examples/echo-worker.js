onmessage = function(e) {
  const timeout = (Math.random() * 3000) + 1;
  setTimeout(() => postMessage(e.data), timeout);
};

