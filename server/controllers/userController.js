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
                msg: "User not found with id: " + userId
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

  /* eslint-disable max-statements */
  post(req, res) {
    const adPostData = req.body;

    //User data
    let userData = {};
    (req.body.accountStatus) ? userData['accountStatus'] = req.body.accountStatus : '';
    (req.body.accountType) ? userData['accountType'] = req.body.accountType : '';
    (req.body.email) ? userData['email'] = req.body.email : '';
    (req.body.password) ? userData['password'] = req.body.password : '';
    (req.body.vtoken) ? userData['vtoken'] = req.body.vtoken : '';
    (req.body.firstname) ? userData['firstname'] = req.body.firstname : '';
    (req.body.lastname) ? userData['lastname'] = req.body.lastname : '';
    (req.body.username) ? userData['username'] = req.body.username : '';
    (req.body.photo) ? userData['photo'] = req.body.photo : '';
    (req.body.phone) ? userData['phone'] = req.body.phone : '';
    (req.body.address) ? userData['address'] = req.body.address : '';
    (req.body.city) ? userData['city'] = req.body.city : '';
    (req.body.region) ? userData['region'] = req.body.region : '';
    (req.body.province) ? userData['province'] = req.body.province : '';
    (req.body.country) ? userData['country'] = req.body.country : '';
    (req.body.accessToken) ? userData['accessToken'] = req.body.accessToken : '';
    (req.body.promocode) ? userData['promocode'] = req.body.promocode : '';
    (req.body.devices) ? userData['devices'] = req.body.devices : '';
    (req.body.emailConfirmed) ? userData['emailConfirmed'] = req.body.emailConfirmed : '';
    (req.body.lastActive) ? userData['lastActive'] = req.body.lastActive : '';
    (req.body.dateCreated) ? userData['dateCreated'] = req.body.dateCreated : '';

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
    const params = req.query;
    const userId = params._id;

    (params.accountStatus) ? userData['accountStatus'] = params.accountStatus : '';
    (params.accountType) ? userData['accountType'] = params.accountType : '';
    (params.email) ? userData['email'] = params.email : '';
    (params.password) ? userData['password'] = params.password : '';
    (params.vtoken) ? userData['vtoken'] = params.vtoken : '';
    (params.firstname) ? userData['firstname'] = params.firstname : '';
    (params.lastname) ? userData['lastname'] = params.lastname : '';
    (params.username) ? userData['username'] = params.username : '';
    (params.photo) ? userData['photo'] = params.photo : '';
    (params.phone) ? userData['phone'] = params.phone : '';
    (params.address) ? userData['address'] = params.address : '';
    (params.city) ? userData['city'] = params.city : '';
    (params.region) ? userData['region'] = params.region : '';
    (params.province) ? userData['province'] = params.province : '';
    (params.country) ? userData['country'] = params.country : '';
    (params.accessToken) ? userData['accessToken'] = params.accessToken : '';
    (params.promocode) ? userData['promocode'] = params.promocode : '';
    (params.devices) ? userData['devices'] = params.devices : '';
    (params.emailConfirmed) ? userData['emailConfirmed'] = params.emailConfirmed : '';
    (params.lastActive) ? userData['lastActive'] = params.lastActive : '';
    (params.dateCreated) ? userData['dateCreated'] = params.dateCreated : '';


    if (params.points) userData.points = params.points;

    if (!userId) {
      const token = this._getUserToken(req);

      return jwt.verify(token, config.jwtSecret, (err, decoded) => {
        if (err) return res.status(401).end();

        const userId = decoded.sub;

        User.findByIdAndUpdate(userId, userData)
          .then(user => {
            if (!user) {
              return res.status(404).json({
                data: {
                  success: false,
                  msg: "User not found with id: " + userId
                }
              })
            };

            return res.status(200).json({
              data: {
                success: true,
                messsage: 'User updated successfully'
              }
            });
          }).catch(err => {
            const ret = Object.assign(err, { status: 0 });
            return res.status(401).json(ret);
          });
      });
    }

    User.findByIdAndUpdate(userId, userData)
      .then(user => {
        if (!user) {
          return res.status(404).json({
            data: {
              success: false,
              msg: "User not found with id: " + userId
            }
          })
        };

        return res.status(200).json({
          data: {
            success: true,
            messsage: 'User updated successfully'
          }
        });
      }).catch(err => {
        const ret = Object.assign(err, { status: 0 });
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
          msg : "User not found with id: " + userId
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

module.exports = UserController;
