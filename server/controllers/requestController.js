const nodemailer = require('nodemailer');
const Mongoose = require('mongoose');
const config = require('../../config');

const helperClass = require('./controllerHelper');
const helper = new helperClass();

const Request = Mongoose.model('Request');

class RequestController {
  constructor() {
    this.post = this.post.bind(this);
    this.delete = this.delete.bind(this);
  }

  //create request and send email to admin
  post(req, res) {
    //build create query
    if(!req.body.userId) req.body.userId = req.body.requesterId;
    const { phone } = (!req.body.phone) ? req.body.phone : 'N/A';
    const { email } = (!req.body.email) ? req.body.email : 'N/A';


    Request.create(req.body).then(request => {
      const transporter = nodemailer.createTransport({ port : '465', host : 'us7.tmd.cloud', auth : { user : config.em_user, pass : config.em_pwd } });
      const mailoptions = {
        from : 'hello@barbielist.com',
        to : 'zelthrox@gmail.com',
        subject : '[BarbieList] Refill Points',
        text : `
                <br>i need shit
                <br>email: `+email+`
                <br>phone: `+phone+`
                <br>requestId: `+request._id+`
              `
      };

      transporter.sendMail(mailoptions,function(err,info){
        if(err) return helper.retError(res,'400',false,err,'Error','');

        return helper.retSuccess(res,'200',true,'','Sucess','');
      });
    }).catch(err => {
      return helper.retError(res,'400',false,err,'Error','');
    });
  }

  //delete request by requestId
  delete(req, res) {
    const { requestId } = req.params;

    Request.findByIdAndRemove(requestId).then(requestData => {
      return helper.retSuccess(res,'200',true,'','Sucess', requestData);
    }).catch(err => {
      return helper.retError(res,'400',false,err,'Error','');
    });
  }

}

module.exports = RequestController;
