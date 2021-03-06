
const mongoose = require('mongoose');
const bycrypt = require('bcrypt');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const PlanSchema = new mongoose.Schema({
  name : {
    type: String,
    required: true
  },
  price : {
    type: Number,
    required: true
  },
  maxQuantity : Number,
  type : {
    type: String,
    default : "",
    required: true
  },
  category: {
    type: String,
    default: "",
    required: true
  },
  desc : {
    type: String,
    default : ""
  },
  status : {
    type: String,
    default : "active",
    required: true
  },
  interval : {
    type: Number,
    default: 0,
  },
  editedBy : {
    type: ObjectId,
    required: true
  },
  lastEdited : {
    type: Date,
    default: Date.now,
    required: true
  },
  dateCreated : {
    type: Date,
    default: Date.now,
    required: true
  }
});

module.exports = mongoose.model('Plan', PlanSchema);
