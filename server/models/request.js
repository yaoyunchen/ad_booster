
const mongoose = require('mongoose');
const bycrypt = require('bcrypt');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const RequestSchema = new Schema({
  amount : {
    type: Number
  },
  userId : {
    type: ObjectId
  },
  type : {
    type: String
  },
  email : {
    type: String
  },
  phone : {
    type: String
  },
  dateCreated : {
    type: Date
  },
  status : {
    type: String
  },
  fulfilledBy : {
    type: ObjectId
  }
});

module.exports = mongoose.model('Request', RequestSchema);
