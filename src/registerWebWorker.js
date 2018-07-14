const getWorker = () => {
  let worker;
  if (window.worker != undefined) {
    worker = new Worker('webworker.js');
  }
  return worker;
};

const sampleWorker = () => {
  const wkr = getWorker();
  wkr.postMessage({
    title: 'Hello',
    message: 'Yo!'
  });
};

const onMessage = event => {
  return process(event.data);
};

const sampleWorker2 = () => {
  const wkr = getWorker();
  wkr.onMessage = event => {
    console.log(event.data);
  };
};

module.export = {
  getWorker
};
