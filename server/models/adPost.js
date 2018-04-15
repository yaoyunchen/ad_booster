const mongoose = require('mongoose');
const bycrypt = require('bcrypt');

const AdPostSchema = new mongoose.Schema({
  postType: {
    type: String,
    required: true
  },
  priority: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  subtitle: String,
  desc: String,
  body: String,
  status: {
    type: String,
    required: true
  },
  createdBy: {
    type: ObjectId,
    required: true
  },
  dateCreated: {
    type: Date,
    required: true
  },
  lastEdited: {
    type: Date,
    required: true
  },
  pin: Number,
  expireDated: {
    type: Date,
    required: true
  },
  expiredDate: {
    type: Date,
    required: true
  },
  notifiy: {
    type: Boolean,
    required: true,
    default: false
  },
  visits: {
    type: Number,
    required: true,
    default: 0
  },
  replies: {
    type: Number,
    required: true,
    default: 0
  },
  address: String,
  city: String,
  region: {
    type: String,
    required: true
  },
  province: String,
  country: String
});


// Compare passed password with value in database
AdPostSchema.methods.comparePassword = function(password, cb) {
  bycrypt.compare(password, this.password, cb);
};


// Pre-save hook
AdPostSchema.pre('save', function(next) {
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

module.exports = mongoose.model('User', AdPostSchema);
