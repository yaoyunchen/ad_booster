const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const PassportLocalStrategy = require('passport-local').Strategy;

const config = require('../../config');

module.exports = new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, email, password, done) => {
  const userData = {
    email: email.trim(),
    password: password.trim()
  };

  const IncorrectCredentialsError = new Error('Incorrect email or password');
  IncorrectCredentialsError.name = 'IncorrectCredentialsError';

  // Find a user by email address
  return User.findOne({ email: userData.email }, (err, user) => {
    if (err) return done(err);

    if (!user) {
      console.log('User not found in database'); // eslint-disable-line no-console
      return done(IncorrectCredentialsError);
    }

    // Check if hashed user's password is equal to value in database
    return user.comparePassword(userData.password, (passErr, isMatch) => {
      if (err) return done(err);

      if (!isMatch) {
        console.log('Password does not match.'); // eslint-disable-line no-console
        return done(IncorrectCredentialsError);
      }

      const data = { name: user.name };
      const payload = { sub: user._id };
      const token = jwt.sign(payload, config.jwtSecret);

      return done(null, token, data);
    });
  });
});
