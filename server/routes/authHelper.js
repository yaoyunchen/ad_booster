const Mongoose = require('mongoose');
const config = require('../../config');

const helperClass = require('../controllers/controllerHelper');
const helper = new helperClass();

const Plan = Mongoose.model('Plan');
const User = Mongoose.model('User');
const AdPost = Mongoose.model('AdPost');
const CollectionIndex = Mongoose.model('CollectionIndex');

class AuthHelper {
  constructor() {
    this.test = this.test.bind(this);
  }

  test(req,res,next){
    if(req.query.title) req.query.body = { here : "yes", succ : "yes"};

    next();
  }

  authUser(req,res,next){
    if (!req.body.requesterId) return helper.retError(res,'400',false,'','requesterId can not be null','');
    if (!req.body.userId) req.body.userId = req.body.requesterId;

    User.findById(req.body.requesterId, (err, requester) => {
      if (err) return helper.retError(res,'400',false,err,'getPlan() Error','');
      if (!requester) return helper.retError(res,'200',false,err,'no requester found','');

      User.findById(req.body.requesterId, (err, user) => {
        if (err) return helper.retError(res,'400',false,err,'getPlan() Error','');
        if (!user) return helper.retError(res,'200',false,err,'no user found','');

        next();
      });
    });
  }

  //get plan by id
  getPlan(req,res,next){
    const { planName } = req.body;

    Plan.findOne({ name : planName, status : 'active'}, (err, plan) => {
      if (err) return helper.retError(res,'400',false,err,'getPlan() Error','');
      if (!plan) return helper.retError(res,'200',false,err,'no plan found','');

      req.body.data = (req.body.data) ? req.body.data : {};
      req.body.data.plan = plan;
      req.body.data.indexName = plan.type;

      next();
    });
  }

  //user pays price amount
  userPays(req,res,next){
    const { userId } = req.body;

    //check if user has enough points
    User.findById(userId, (err, user) => {
      if (err) return helper.retError(res,'400',false,err,'userPays().findById Error','');
      if (!user) return helper.retError(res,'200',false,err,'no user found','');
      if(user.points < req.body.data.plan.price) return helper.retError(res,'200',false,err,'user does not have enough points','');

      //charge user price
      const newPoints = user.points - req.body.data.plan.price;
      User.findByIdAndUpdate(userId, { points : newPoints }, (err, user) => {
        if (err) return helper.retError(res,'400',false,err,'userPays().findByIdAndUpdate Error','');
        if (!user) return helper.retError(res,'200',false,err,'no user found','');

        next();
      });
    });
  }

  //get and increase index count
  getAndIncIndex(req,res,next){
    const { indexName } = req.body.data;

    CollectionIndex.findOneAndUpdate({ name : indexName }, { $inc : { index : 1 } },(err, index) => {
      if (err) return helper.retError(res,'400',false,err,'getAndIncIndex().findOne Error','');
      if (!index) return helper.retError(res,'200',false,err,'no index found','');

      req.body.data = (req.body.data) ? req.body.data : {};
      req.body.data.collectionIndex = index.index;

      next();
    });
  }

  //set pin or not pin
  setPinnedStatus(req,res,next){
    const { adPostId } = req.body;
    const { userId } = req.body;

    //check if post is already pinned
    AdPost.findById(adPostId, (err, adpost) => {
      if (err) return helper.retError(res,'400',false,err,'setPinnedStatus().findByIdAndUpdate Error','');
      if (!adpost) return helper.retError(res,'200',false,err,'no adpost found','');
      if(adpost.pinned == true) return helper.retError(res,'200',false,err,'post is already pinned','');

      AdPost.findByIdAndUpdate(adPostId, {pinned : true}, (err, adpost) => {
        if (err) return helper.retError(res,'400',false,err,'setPinnedStatus().findByIdAndUpdate Error','');
        if (!adpost) return helper.retError(res,'200',false,err,'no adpost found','');

        //get count of pinned
        AdPost.count({pinned : true}, (err, count) => {
          if (err) return helper.retError(res,'400',false,err,'setPinnedStatus().count Error','');
          if (!count) return helper.retError(res,'200',false,err,'no count found','');

          //check user points
          User.findById(userId, (err, user) => {
            if (err) return helper.retError(res,'400',false,err,'userPays().findById Error','');
            if (!user) return helper.retError(res,'200',false,err,'no user found','');

            //if more than maxQuantity or not enough points, unpin
            const points = user.points;
            const price = req.body.data.plan.price;
            const maxQuantity = req.body.data.plan.maxQuantity;

            if (points < price || maxQuantity < count){
              AdPost.findByIdAndUpdate(adPostId, { pinned : false }, (err, adpost) => {
                if(maxQuantity < count) return helper.retError(res,'200',false,err,'number of pinned ad post has exceeded the limit','');
                if(points < price) return helper.retError(res,'200',false,err,'user does not have enough points','');
              });
            }

            next();
          });
        });
      });
    });

  }


}

module.exports = AuthHelper;
