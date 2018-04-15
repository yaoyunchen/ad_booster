const mongoose = require('mongoose');

module.exports.connect = (uri) => {
  mongoose.connect(uri);

  mongoose.Promise = global.Promise;

  mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error', err); // eslint-disable-line no-console
  });

  // Load models
  require('./user');
  require('/adPost');
};
