const nodemailer = require('nodemailer');
const config = require('../../config');

// let transporter = nodeMailer.createTransport({
//   service : 'gmail',
//   auth : {
//     user : 'zelthrox@gmail.com',
//     pass : config.gpd
//   }
// });

const sender = nodemailer.createTransport({
  service : 'gmail',
  auth : {
    user : 'zelthrox@gmail.com',
    pass : ''
  }
});

const mailoptions = {
  from : 'zelthrox@gmail.com',
  to : 'kwan.andy@hotmail.com',
  subject : 'testing shit',
  text : 'my node email'
};

sender.sendMail(mailoptions,function(err,info){
  if(err){
    console.log(err);
    console.log(info);
  } else {
    console.log('email sent...');
  }
})
