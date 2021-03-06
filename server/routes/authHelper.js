const Mongoose = require('mongoose');
const config = require('../../config');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const helperClass = require('../controllers/controllerHelper');
const helper = new helperClass();

const Plan = Mongoose.model('Plan');
const User = Mongoose.model('User');
const AdPost = Mongoose.model('AdPost');
const CollectionIndex = Mongoose.model('CollectionIndex');
const Request = Mongoose.model('Request');

class AuthHelper {
  constructor() {
    this.authUser = this.authUser.bind(this);
    this.decryptId = this.decryptId.bind(this);
    this.decryptRequesterUserId = this.decryptRequesterUserId.bind(this);
    this.parseImages = this.parseImages.bind(this);
    this.moveImages = this.moveImages.bind(this);
  }

  //AUTHENTICATE
  async authUser(req,res,next){
    //check headers
    if (!req.headers.authorization) return helper.retError(res,'401',true,'','requesterId can not be null','');;
    //created requesterId
    req.body.requesterId = req.headers.authorization.split(' ')[1];

    //decript userId requesterId createdBy
    if(req.body.requesterId) req.body.requesterId = await this.decryptId(req.body.requesterId);
    if(req.body.userId) req.body.userId = await this.decryptId(req.body.userId);
    if(req.body.userId == 'error' || req.body.requesterId == 'error') return helper.retError(res,'401',true,'','decrypt id failed','');;

    //create userId
    if (!req.body.userId) req.body.userId = req.body.requesterId;

    User.findById(req.body.requesterId, (err, requester) => {
      if (err) return helper.retError(res,'500',false,err,'getPlan() Error','');
      if (!requester) return helper.retError(res,'401',true,err,'no requester found','');

      User.findById(req.body.userId, (err, user) => {
        if (err) return helper.retError(res,'500',false,err,'getPlan() Error','');
        if (!user) return helper.retError(res,'401',true,'no user found','');

        next();
      });
    });
  }

  async decryptRequesterUserId(req,res,next){
    //decrypt body
    if(req.body.requesterId) req.body.requesterId = await this.decryptId(req.body.requesterId);
    if(req.body.userId) req.body.userId = await this.decryptId(req.body.userId);
    if(req.body.requesterId && req.body.userId == 'error' || req.body.requesterId == 'error') return helper.retError(res,'401',true,'','decrypt id failed','');;
    //create userId
    if (req.body.requesterId && !req.body.userId) req.body.userId = req.body.requesterId;
    //decrypt query
    if(req.query.requesterId) req.query.requesterId = await this.decryptId(req.query.requesterId);
    if(req.query.userId) req.query.userId = await this.decryptId(req.query.userId);
    if(req.query.userId == 'error' || req.query.requesterId == 'error') return helper.retError(res,'401',true,'','decrypt id failed','');;
    //create userId
    if (req.query.requesterId && !req.query.userId) req.query.userId = req.query.requesterId;

    next();
  }

  decryptId(id){
    return jwt.verify(id, config.jwtSecret, (err, decoded) => {
      if (err) return 'error';
      return decoded.sub;
    });
  }

  //PLANS
  //get plan by id
  getPlan(req,res,next){
    const { planName } = req.body;

    Plan.findOne({ name : planName, status : 'active'}, (err, plan) => {
      if (err) return helper.retError(res,'500',false,err,'getPlan() Error','');
      if (!plan) return helper.retError(res,'401',true,err,'no plan found','');

      req.body.data = (req.body.data) ? req.body.data : {};
      req.body.data.plan = plan;
      req.body.data.indexName = plan.type;

      next();
    });
  }

  //USERS
  //user pays price amount
  userPays(req,res,next){
    const { userId } = req.body;

    //check if user has enough points
    User.findById(userId, (err, user) => {
      if (err) return helper.retError(res,'500',false,err,'userPays().findById Error','');
      if (!user) return helper.retError(res,'401',true,err,'no user found','');
      if(user.points < req.body.data.plan.price) return helper.retError(res,'401',true,err,'user does not have enough points','');

      //charge user price
      const newPoints = user.points - req.body.data.plan.price;
      User.findByIdAndUpdate(userId, { points : newPoints }, (err, user) => {
        if (err) return helper.retError(res,'500',false,err,'userPays().findByIdAndUpdate Error','');
        if (!user) return helper.retError(res,'401',true,err,'no user found','');

        next();
      });
    });
  }

  //COLLECTIONINDEX
  //get and increase index count
  getAndIncIndex(req,res,next){
    const { indexName } = req.body.data;

    CollectionIndex.findOneAndUpdate({ name : indexName }, { $inc : { index : 1 } },(err, index) => {
      if (err) return helper.retError(res,'500',false,err,'getAndIncIndex().findOne Error','');
      if (!index) return helper.retError(res, '401', true, err,'no index found getAndIncIndex','');

      req.body.data = (req.body.data) ? req.body.data : {};
      req.body.data.collectionIndex = index.index;

      next();
    });
  }

  //ADPOST
  //set pin or not pin
  setPinnedStatus(req,res,next){
    const { adPostId } = req.body;
    const { userId } = req.body;

    //check if post is already pinned
    AdPost.findById(adPostId, (err, adpost) => {
      if (err) return helper.retError(res,'500',false,err,'setPinnedStatus().findByIdAndUpdate Error','');
      if (!adpost) return helper.retError(res,'401',true,err,'no adpost found','');
      if(adpost.pinned == true) return helper.retError(res,'401',true,err,'post is already pinned','');

      AdPost.findByIdAndUpdate(adPostId, {pinned : true}, (err, adpost) => {
        if (err) return helper.retError(res,'500',false,err,'setPinnedStatus().findByIdAndUpdate Error','');
        if (!adpost) return helper.retError(res,'401',true,err,'no adpost found','');

        //get count of pinned
        AdPost.count({pinned : true}, (err, count) => {
          if (err) return helper.retError(res,'500',false,err,'setPinnedStatus().count Error','');
          if (!count) return helper.retError(res,'401',true,err,'no count found','');

          //check user points
          User.findById(userId, (err, user) => {
            if (err) return helper.retError(res,'500',false,err,'userPays().findById Error','');
            if (!user) return helper.retError(res,'401',true,err,'no user found','');

            //if more than maxQuantity or not enough points, unpin
            const points = user.points;
            const price = req.body.data.plan.price;
            const maxQuantity = req.body.data.plan.maxQuantity;

            if (points < price || maxQuantity < count){
              AdPost.findByIdAndUpdate(adPostId, { pinned : false }, (err, adpost) => {
                if(maxQuantity < count) return helper.retError(res,'400',false,err,'number of pinned ad post has exceeded the limit','');
                if(points < price) return helper.retError(res,'401',true,err,'user does not have enough points','');
              });
            }

            next();
          });
        });
      });
    });
  }

  //REQUEST
  //update request to fulfilled and add points to user
  fulfillRequest(req, res, next) {
    const { requestId } = req.body;
    //find request
    Request.findById(requestId, (err, request) => {
      if (err) return helper.retError(res,'500',false,err,'fulfillRequest().findById Error','');
      if (!request) return helper.retError(res,'401',true,err,'no request found','');
      if(request.status != 'pending') return helper.retError(res,'401',true,err,'error, request is' + request.status,'');
      //update request
      req.body.data = (req.body.data) ? req.body.data : {};
      req.body.data.requestAmount = request.amount;
      req.body.data.requestUserId = request.userId;
      const updateData = {
        status : "fulfilled",
        fulfilledBy : req.body.requesterId
      };
      //find user
      User.findById(request.userId, (err, user) => {
        if (err) return helper.retError(res,'500',false,err,'fulfillRequest().findById Error','');
        if (!user) return helper.retError(res,'401',true,err,'request has does not have correct user','');
        req.body.data.userPoints = user.points;
        //if user not found, unfilfill request
        Request.findByIdAndUpdate(requestId, updateData, (err, request) => {
          if (err) return helper.retError(res,'500',false,err,'fulfillRequest().findByIdAndUpdate Error','');

          next();
        });
      });
    });
  }

  //handle files
  async parseImages(req, res, next) {
    const { requesterId } = req.body;
    const { collectionIndex } = req.body.data;
    const { files } = req;
    const dirId = requesterId.concat(collectionIndex);

    if (files){
      const photos = (req.body.photos) ? req.body.photos : [];
      req.body.photos = await this.moveImages(files, dirId, photos);
    }

    next();
  }

  moveImages(files, dirId, photos){
    for (let key in files) {
      let fileObj = files[key];
      let fileObjType = typeof fileObj;
      if (fileObjType === 'object' && fileObjType !== null){
        const { file } = fileObj;
        const { filename } = fileObj;
        const source = fs.createReadStream(file);

        const dir = 'public/assets/images/adPost/' + dirId;
        if (!fs.existsSync(dir)) fs.mkdirSync(dir);
        const dest = fs.createWriteStream(dir + '/' + filename);

        source.pipe(dest);
        source.on('end', function () {
          fs.unlinkSync('/tmp/express-busboy/' + fileObj.uuid + '/' + fileObj.field + '/' + fileObj.filename);
          fs.rmdirSync('/tmp/express-busboy/' + fileObj.uuid + '/' + fileObj.field);
          fs.rmdirSync('/tmp/express-busboy/' + fileObj.uuid);
        });
        source.on('error', function (err) {
          photos.push('err');
        });

        const photo = 'assets/images/adPost/' + dirId + '/' + fileObj.filename;
        photos.push(photo);
      } else if (fileObjType === 'string') {
        photos.push(fileObj);
      }
    }
    return photos;
  }

}

module.exports = AuthHelper;
