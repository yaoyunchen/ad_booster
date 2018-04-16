const User = require('mongoose').model('User');
const PassportLocalStrategy = require('passport-local').Strategy;

module.exports = new PassportLocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, email, password, done) => {
  const userData = {
    firstname: req.body.firstname.trim(),
    lastname: req.body.lastname.trim(),
    username: req.body.username.trim(),
    email: email.trim(),
    password: password.trim()
  };

  const newUser = new User(userData);

  newUser.save((err) => {
    if (err) {
      console.log('NEW USE SAVE FAILED:', err);
      return done(err)
    };

    return done(null);
  });
});
