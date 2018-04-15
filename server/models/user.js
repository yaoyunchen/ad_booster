const mongoose = require('mongoose');
const bycrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    index: { unique: true }
  },
  password: String,
  name: String
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
