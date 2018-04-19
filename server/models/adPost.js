
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const AdPostSchema = new mongoose.Schema({
  postType: {
    type: String,
    // required: true
  },
  priority: {
    type: Number,
    // required: true
  },
  title: {
    type: String,
    // required: true
  },
  subtitle: String,
  desc: String,
  body: String,
  status: {
    type: String,
    // required: true
  },
  createdBy: {
    type: ObjectId,
    // required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now,
    // required: true
  },
  lastEdited: {
    type: Date,
    default: Date.now,
    // required: true
  },
  expiryDated: {
    type: Date,
    // required: true
  },
  notifiy: {
    type: Boolean,
    // required: true,
    default: false
  },
  visits: {
    type: Number,
    // required: true,
    default: 0
  },
  replies: {
    type: Number,
    // required: true,
    default: 0
  },
  address: String,
  city: String,
  region: {
    type: String,
    // required: true
  },
  province: String,
  country: String,
  photo: [String]
});

module.exports = mongoose.model('AdPost', AdPostSchema);
