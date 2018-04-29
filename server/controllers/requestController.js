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

    Request.create(req.body).then(request => {
      const transporter = nodemailer.createTransport({ port : '465', host : 'us7.tmd.cloud', auth : { user : em_user, pass : em_pwd } });
      const mailoptions = {
        from : 'hello@barbielist.com',
        to : 'zelthrox@gmail.com',
        subject : 'testing shit',
        text : 'my node email'
      };
      transporter.sendMail(mailoptions,function(err,info){
        if(err) return helper.retError(res,'400',false,err,'Error','');

        return helper.retSuccess(res,'200',true,'','Sucess','');
      })
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
