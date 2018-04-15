const env = process.env.NODE_ENV || 'development';

/* eslint-disable no-console */
const debugLog = (...args) => {
  if (env === 'production') return;

  switch (args[0]) {
    case 'error':
      console.error(...args.slice(1));
      break;
    default:
      console.log(...args);
  }
};

module.exports = debugLog;
