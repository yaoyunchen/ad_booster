const User = require('mongoose').model('User');
const PassportLocalStrategy = require('passport-local').Strategy;

module.exports = new PassportLocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, email, password, done) => {
  const userData = {
    username: req.body.username.trim(),
    email: email.trim(),
    password: password.trim()
  };

  const newUser = new User(userData);

  newUser.save((err) => {
    if (err) return done(err);
    return done(null);
  });
});
