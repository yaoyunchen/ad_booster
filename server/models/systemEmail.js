
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SystemEmailSchema = new Schema({
  emailId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  from: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  enText: {
    type: String,
    required: true
  },
  cntext: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('SystemEmail', SystemEmailSchema);
