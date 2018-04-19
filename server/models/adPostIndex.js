
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const AdPostIndexSchema = new Schema({
  index : {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('AdPostIndex', AdPostIndexSchema);
