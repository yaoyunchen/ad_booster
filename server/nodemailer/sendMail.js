const nodemailer = require('nodemailer');
const config = require('../../config');

// const transporter = nodemailer.createTransport({
//   service : 'gmail',
//   auth : {
//     user : 'hello@barbielist.com',
//     pass : 'Poliku123!'
//   }
// });

const transporter = nodemailer.createTransport({
    port : '465',
    host : 'us7.tmd.cloud',
    auth : {
      user : "hello@barbielist.com",
      pass : "Poliku123!"
    }
});

const mailoptions = {
  from : 'kwan.andy@hotmail.com',
  to : 'zelthrox@gmail.com',
  subject : 'testing more shit',
  text : 'my node email from kwan'
};

// const mailoptions = {
//   port : '465',
//   host : 'us7.tmd.cloud',
//   auth : {
//     user : 'hello@barbielist.com',
//     pass : 'Poliku123!'
//   }
// };

transporter.sendMail(mailoptions,function(err,info){
  if(err){
    console.log(err);
    console.log(info);
  } else {
    console.log(info);
    console.log('email sent...');
  }
})
