const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const PassportLocalStrategy = require('passport-local').Strategy;

const config = require('../../config');

module.exports = new PassportLocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, username, password, done) => {
  const userData = {
    username: username.trim(),
    password: password.trim()
  };

  const IncorrectCredentialsError = new Error('Incorrect username or password');
  IncorrectCredentialsError.name = 'IncorrectCredentialsError';

  // Find a user by username
  return User.findOne({ username: userData.username }, (err, user) => {
    if (err) {
      console.log('LOGIN ERROR FINDING USER:', err);
      return done(err);
    };

    if (!user) {
      console.log('User not found in database'); // eslint-disable-line no-console
      return done(IncorrectCredentialsError);
    }

    // Check if hashed user's password is equal to value in database
    return user.comparePassword(userData.password, (passErr, isMatch) => {
      if (passErr) {
        console.log('LOGIN PASSWORD ERROR:', passErr);
        return done(passErr);
      };

      if (!isMatch) {
        console.log('Password does not match.'); // eslint-disable-line no-console
        return done(IncorrectCredentialsError);
      }

      const data = { username: user.username };
      const payload = { sub: user._id };
      const token = jwt.sign(payload, config.jwtSecret);

      return done(null, token, data);
    });
  });
});
