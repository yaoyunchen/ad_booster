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
    const { id } = req.query;

    const token = id !== 'null' ? id : this._getUserToken(req);

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
    User.find()
    .then(user => {
      return res.status(200).json({
        status : 1,
        data : user
      });
    }).catch(err => {
      const ret = Object.assign(err, {status : 0});
      return res.status(401).json(ret);
    });
  }

  getPoints(req, res) {
    const { id } = req.query;

    const token = id !== 'null' ? id : this._getUserToken(req);

    return jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) return res.status(401).end();

      const userId = decoded.sub;

      return User.findById(userId)
        .then(user => {
          if (!user) {
            return res.status(404).json({
              data: {
                status: 0,
                msg: "Ad Post not found with id: " + userId
              }
            })
          };

          return res.status(200).json({
            status: 1,
            data: user.points || 0
          });
        }).catch(err => {
          const ret = Object.assign(err, { status: 0 });
          return res.status(401).json(ret);
        });
    });
  }

  post(req, res) {
    //User data
    let userData = {};
    (req.body.accountStatus) ? userData['accountStatus'] = req.body.accountStatus : '';
    (req.body.accountType) ? userData['accountType'] = req.body.accountType : '';
    (req.body.email) ? userData['email'] = req.body.email : '';
    (req.body.password) ? userData['password'] = req.body.password : '';
    (req.body.username) ? userData['username'] = req.body.username : '';
    (req.body.photo) ? userData['photo'] = req.body.photo : '';
    (req.body.promocode) ? userData['promocode'] = req.body.promocode : '';
    (req.body.devices) ? userData['devices'] = req.body.devices : '';
    (req.body.emailConfirmed) ? userData['emailConfirmed'] = req.body.emailConfirmed : '';
    (req.body.lastActive) ? userData['lastActive'] = req.body.lastActive : '';
    (req.body.dateCreated) ? userData['dateCreated'] = req.body.dateCreated : '';

    const token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400
    });

    User.create(adPostData)
    .then(user => {
        return res.status(200).json({ data: {
          status : 1,
          msg : 'Ad post created successfully'
        }});
    }).catch(err => {
        const ret = Object.assign(err, {status : 0});
        return res.status(401).json(ret);
    });
  }

  put(req, res) {
    let userData = {};
    (req.body.accountStatus) ? userData['accountStatus'] = req.body.accountStatus : '';
    (req.body.accountType) ? userData['accountType'] = req.body.accountType : '';
    (req.body.email) ? userData['email'] = req.body.email : '';
    (req.body.password) ? userData['password'] = req.body.password : '';
    (req.body.username) ? userData['username'] = req.body.username : '';
    (req.body.photo) ? userData['photo'] = req.body.photo : '';
    (req.body.promocode) ? userData['promocode'] = req.body.promocode : '';
    (req.body.devices) ? userData['devices'] = req.body.devices : '';
    (req.body.emailConfirmed) ? userData['emailConfirmed'] = req.body.emailConfirmed : '';
    (req.body.lastActive) ? userData['lastActive'] = req.body.lastActive : '';
    (req.body.dateCreated) ? userData['dateCreated'] = req.body.dateCreated : '';

    User.findByIdAndUpdate(userId, adPostData)
    .then(user => {
      if(!user) {
        return res.status(404).json({ data: {
          status : 0,
          msg : "Ad Post not found with id: " + userId
      }})};

      return res.status(200).json({ data: {
        status : 1,
        msg : 'Ad post updated successfully'
      }});
    }).catch(err => {
        const ret = Object.assign(err, {status : 0});
        return res.status(401).json(ret);
    });
  }

  delete(req, res) {
    const userId = req.params.userId;

    User.findByIdAndRemove(userId)
    .then(user => {
      if(!user) {
        return res.status(404).json({ data: {
          status : 0,
          msg : "Ad Post not found with id: " + userId
      }})};

      return res.status(200).json({
        status : 1,
        msg : 'Ad post deleted successfully'
      });
    }).catch(err => {
      const ret = Object.assign(err, {status : 0});
      return res.status(401).json(ret);
    });
  }


  _getUserToken(req) {
    if (!req.headers.authorization) return;
    return req.headers.authorization.split(' ')[1];
  }
}

module.exports = new UserController();
