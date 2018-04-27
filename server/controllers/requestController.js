const Mongoose = require('mongoose');
const config = require('../../config');

const helperClass = require('./controllerHelper');
const helper = new helperClass();

const Request = Mongoose.model('Request');

class RequestController {
  constructor() {
    this.post = this.post.bind(this);
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
    const { requestId } = req.params;

    return Request.findByIdAndRemove(requestId).then(requestData => {
      return helper.retSuccess(res,'200',true,'','Sucess', requestData);
    }).catch(err => {
      return helper.retError(res,'400',false,err,'Error','');
    });
  }

}

module.exports = RequestController;
