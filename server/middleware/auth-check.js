const jwt = require('jsonwebtoken');
const Mongoose = require('mongoose');

const config = require('../../config');

const User = Mongoose.model('User');

module.exports = (req, res, next) => {
  if (!req.headers.authorization) return res.status(401).end();

  const token = req.headers.authorization.split(' ')[1];

  // Decode the token using the secret key phrase
  return jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) return res.status(401).end();

    const userId = decoded.sub;

    return User.findById(userId, (userErr, user) => {
      if (userErr || !user) return res.status(401).end();

      return next();
    });
  });
};
