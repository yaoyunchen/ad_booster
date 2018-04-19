const jwt = require('jsonwebtoken');
const Mongoose = require('mongoose');

const config = require('../../config');
const User = Mongoose.model('User');

class UserController {
  constructor() {
    this.get = this.get.bind(this);
    this.getIsAdmin = this.getIsAdmin.bind(this);
    this.getUsers = this.getUsers.bind(this);
    this.getPoints = this.getPoints.bind(this);
    this.post = this.post.bind(this);
    this.put = this.put.bind(this);
    this.delete = this.delete.bind(this);
  }

  // Default GET for user.  Returns complete user data.
  get(req, res) {
    const token = this._getUserToken(req);

    return jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) return res.status(401).end();

      const userId = decoded.sub;

      return User.findById(userId, (userErr, user) => {
        if (userErr || !user) return res.status(401).end();

        return res.status(200).json({ data: user });
      });
    });
  }

  getIsAdmin(req, res) {
    const token = this._getUserToken(req);

    return jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) return res.status(401).end();

      const userId = decoded.sub;

      return User.findById(userId, (userErr, user) => {
        if (userErr || !user) return res.status(401).end();

        return res.status(200).json({ data: user.accountType === 'admin' });
      });
    });
  }

  getUsers(req, res) {
    return User.find( { account_status: 'active'}, (userErr, user) => {
      if (userErr || !user) return res.status(401).end();

      return res.status(200).json({ data: user });
    });
  }

  getPoints(req, res) {
    return User.findById(userId, (userErr, user) => {
      if (userErr || !user) return res.status(401).end();

      return res.status(200).json({ data: user.points});
    });
  }

  post(req, res) {
    //User data
    const userData = {};
    (req.body.firstname) ? userData.firstname = req.body.firstname.trim() : '';
    (req.body.lname) ? userData.lname = req.body.lname.trim() : '';
    (req.body.username) ? userData.username = req.body.username.trim() : '';
    (req.body.email) ? userData.email = req.body.email.trim() : '';
    (req.body.password) ? userData.password = req.body.password.trim() : '';

    userData.dateCreated = new Date();
    userData.username = 'default username';

    //new user
    const newUser = new User({userData});

    newUser.save()
     .then(data => {
       return res.status(200).end();
     }).catch(err => {
       return res.status(401).end();
    });
  }

  put(req, res) {
    return User.findByIdAndUpdate(userId, req.params, (userErr, user) => {
      if (userErr || !user) return res.status(401).end();

      return res.status(200).json({ data: user.points});
    });
  }

  delete(req, res) {
    return User.findByIdAndRemove(userId, req.params, (userErr, user) => {
      if (userErr || !user) return res.status(401).end();

      return res.status(200).json();
    });
  }


  _getUserToken(req) {
    if (!req.headers.authorization) return;
    return req.headers.authorization.split(' ')[1];
  }
}

module.exports = new UserController();



/*
accountStatus
accountType
email
password
salt
vtoken
firstname
lastname
username
photo
phone
address
city
region
province
country
accessToken
promocode
devices
emailConfirmed
lastActive
dateCreated
*/
