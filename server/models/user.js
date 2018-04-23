/* eslint-disable no-undef */

const mongoose = require('mongoose');
const bycrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  accountStatus: {
    type: String,
    // required: true
  },
  accountType: {
    type: String,
    // required: true
  },
  email: {
    type: String,
    index: { unique: true },
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    // required: true
  },
  vtoken: {
    type: String,
    // required: true
  },
  firstname: {
    type: String,
    required: true,
    trim: true
  },
  lastname: {
    type: String,
    required: true,
    trim: true
  },
  username: {
    type: String,
    index: { unique: true },
    required: true,
    trim: true
  },
  photo: String,
  phone: String,
  address: String,
  city: String,
  region: String,
  province: String,
  country: String,
  accessToken: String,
  promocode: String,
  points: Number,
  devices: [],
  emailConfirmed: {
    type: Boolean,
    // required: true
  },
  lastActive: {
    type: Date,
    default: Date.now,
    // required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now,
    // required: true
  }
});

// Compare passed password with value in database
UserSchema.methods.comparePassword = function(password, cb) {
  bycrypt.compare(password, this.password, cb);
};


// Pre-save hook
UserSchema.pre('save', function(next) {
  const user = this;

  if (!user.isModified('password')) return next();

  return bycrypt.genSalt((saltErr, salt) => {
    if (saltErr) return next(saltErr);

    return bycrypt.hash(user.password, salt, (hashErr, hash) => {
      // Replace password string with hash value
      user.password = hash;

      return next();
    });
  });
});

module.exports = mongoose.model('User', UserSchema);
