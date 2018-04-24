const jwt = require('jsonwebtoken');
const Mongoose = require('mongoose');

const config = require('../../config');
const PointRequest = Mongoose.model('PointRequest');

const ObjectId = Mongoose.Types.ObjectId;

class PointRequestController {
  constructor() {
    this.get = this.get.bind(this);
    this.putFulfill = this.putFulfill.bind(this);
    this.delete = this.delete.bind(this);
  }

  //create request and send email to admin
  post(req, res) {
    return null;
  }

  //update request to fulfilled and add points to user
  putFulfill(req, res) {
    return null;
  }

  //delete request by requestId
  delete(req, res) {
    return null;
  }

}

module.exports = new PointRequestController();
