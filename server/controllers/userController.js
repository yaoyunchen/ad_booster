const jwt = require('jsonwebtoken');
const Mongoose = require('mongoose');

const config = require('../../config');

const helperClass = require('./controllerHelper');
const helper = new helperClass();

const User = Mongoose.model('User');

class UserController {
  constructor() {
    this.get = this.get.bind(this);
    this.getIsAdmin = this.getIsAdmin.bind(this);
    this.getUsers = this.getUsers.bind(this);
    this.getField = this.getField.bind(this);
    this.post = this.post.bind(this);
    this.put = this.put.bind(this);
    this.putAddPoints = this.putAddPoints.bind(this);
    this.delete = this.delete.bind(this);
  }

  // Default GET for user.  Returns complete user data.
  get(req, res) {
    const { userId } = req.query;

    const token = userId !== 'null' ? userId : this._getUserToken(req);

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
    return User.find(req.query).then(userData => {
      if(!userData.length) return helper.retError(res,'400',true,'','No matching results',userData);
      return helper.retSuccess(res,'200',true,'','Sucess',userData);
    }).catch(err => {
      return helper.retError(res,'500',false,err,'Error','');
    });
  }

  getField(req, res) {
    const token = req.query.userId;

    return jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) return res.status(401).end();

      const userId = decoded.sub;
      const { field } = req.query;

      if(userId == null || field == null) return res.status(400).end();
      const projection = field + " -_id";

      return User.findById(userId, projection).then(userData => {
        if(!userData) return helper.retError(res,'400',true,'','No matching results',userData);
        return helper.retSuccess(res,'200',true,'','Sucess',userData);
      }).catch(err => {
        return helper.retError(res,'500',false,err,'Error','');
      });
    });
  }

  /* eslint-disable max-statements */
  post(req, res) {
    return User.create(req.body).then(userData => {
      return helper.retSuccess(res,'200',true,'','Sucess',userData);
    }).catch(err => {
      return helper.retError(res,'500',false,err,'Error getField','');
    });
  }

  put(req, res) {
    const { userId } = req.body

    User.findByIdAndUpdate(userId, req.body).then(userData => {
      return helper.retSuccess(res,'200',true,'','Sucess',userData);
    }).catch(err => {
      return helper.retError(res,'500',false,err,'Error put','');
    });
  }

  putAddPoints(req, res) {
    const { requestAmount } = req.body.data
    const { userPoints } = req.body.data
    const { requestUserId } = req.body.data
    const newPoints = userPoints + requestAmount;

    User.findByIdAndUpdate(requestUserId, { points : newPoints}).then(userData => {
      return helper.retSuccess(res,'200',true,'','Sucess',userData);
    }).catch(err => {
      return helper.retError(res,'500',false,err,'Error putAddPoints','');
    });
  }

  delete(req, res) {
    const { userId } = req.query;

    return User.findByIdAndRemove(userId).then(userData => {
      return helper.retSuccess(res,'200',true,'','Sucess', userData);
    }).catch(err => {
      return helper.retError(res,'500',false,err,'Error delete','');
    });
  }


  _getUserToken(req) {
    if (!req.headers.authorization) return;
    return req.headers.authorization.split(' ')[1];
  }
}

module.exports = UserController;
