const User = require('mongoose').model('User');
const PassportLocalStrategy = require('passport-local').Strategy;

module.exports = new PassportLocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, username, password, done) => {
  const userData = {
    username: username.trim(),
    email: req.body.email.trim(),
    password: password.trim()
  };

  console.log(userData);

  const newUser = new User(userData);

  newUser.save((err) => {
    if (err) return done(err);
    return done(null);
  });
});
