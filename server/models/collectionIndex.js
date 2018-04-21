
const mongoose = require('mongoose');
const bycrypt = require('bcrypt');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const CollectionIndexSchema = new Schema({
  name : {
    type: String,
    required: true
  },
  index : {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('CollectionIndex', CollectionIndexSchema);
