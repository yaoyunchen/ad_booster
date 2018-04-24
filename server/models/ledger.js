
const mongoose = require('mongoose');
const bycrypt = require('bcrypt');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const LedgerSchema = new Schema({
  product : {
    type: String
  },
  plan : {
    type: String
  },
  amount : {
    type: Number
  },
  userId : {
    type: ObjectId
  },
  createdBy : {
    type: ObjectId
  },
  dateCreated : {
    type: Date
  },
  startDate : {
    type: Date
  },
  endDate : {
    type: Date
  }
});

module.exports = mongoose.model('Ledger', LedgerSchema);
