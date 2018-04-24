
const mongoose = require('mongoose');
const bycrypt = require('bcrypt');

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
    default: "",
    // required: true
  },
  subtitle: {
    type: String,
    default: ""
  },
  desc: {
    type: String,
    default: ""
  },
  body: {
    type: String,
    default: ""
  },
  status: {
    type: String,
    default: "active",
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
  editedBy: {
    type: ObjectId,
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
  pinned: {
    type: Boolean,
    // required: true,
    default: false
  },
  pinnedDate: {
    type: Date
  },
  pinExpiryDate: {
    type: Date
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
  address: {
    type: String,
    default: ""
  },
  city: {
    type: String,
    default: ""
  },
  region: {
    type: String,
    // required: true
  },
  province: {
    type: String,
    default: ""
  },
  country: {
    type: String,
    default: ""
  },
  photo: {
    type: [String],
    default: []
  }
});

module.exports = mongoose.model('AdPost', AdPostSchema);
