const jwt = require('jsonwebtoken');
const Mongoose = require('mongoose');

const config = require('../../config');
const AdPost = Mongoose.model('AdPost');

const ObjectId = Mongoose.Types.ObjectId;

class AdPostController {
  constructor() {
    this.get = this.get.bind(this);
    this.getUserAdPosts = this.getUserAdPosts.bind(this);
    this.getStatus = this.getStatus.bind(this);
    this.getAdPost = this.getAdPost.bind(this);
    this.post = this.post.bind(this);
    this.put = this.put.bind(this);
    this.delete = this.delete.bind(this);
  }

  get(req, res) {
    AdPost.find()
    .then(adPost => {
      return res.status(200).json({
        status : 1,
        data : adPost
      });
    }).catch(err => {
      const ret = Object.assign(err, {status : 0});
      return res.status(401).json(ret);
    });
  }

  getUserAdPosts(req, res) {
    const userId = req.params.userId;

    AdPost.find({createdBy : ObjectId(userId)})
    .then(adPost => {
      return res.status(200).json({
        status : 1,
        data : adPost
      });
    }).catch(err => {
      const ret = Object.assign(err, {status : 0});
      return res.status(401).json(ret);
    });
  }

  getStatus(req, res) {
    return AdPost.find((adPostErr, adPost) => {
      if (adPostErr || !adPost) return res.status(401).end();
      return res.status(200).json({ data: adPost });
    });
  }

  getAdPost(req, res) {
    const adPostId = req.params.adPostId;

    AdPost.findById(adPostId)
    .then(adPost => {
      if(!adPost) {
        return res.status(404).json({ data: {
          status : 0,
          msg : "Ad Post not found with id: " + adPostId
      }})};

      return res.status(200).json({
        status : 1,
        data : adPost
      });
    }).catch(err => {
        const ret = Object.assign(err, {status : 0});
        return res.status(401).json(ret);
    });
  }

  post(req, res) {
    //User data
    let adPostData = {};

    adPostData['postType'] = (req.body.postType) ? req.body.postType.trim() : '';
    adPostData['priority'] = (req.body.priority) ? req.body.priority : 0; //need work
    adPostData['title'] = (req.body.title) ? req.body.title.trim() : '';
    adPostData['subtitle'] = (req.body.subtitle) ? req.body.subtitle.trim() : '';
    adPostData['desc'] = (req.body.desc) ? req.body.desc.trim() : '';
    adPostData['body'] = (req.body.body) ? req.body.body.trim() : '';
    adPostData['status'] = (req.body.status) ? req.body.status : 'active';
    adPostData['createdBy'] = (req.body.createdBy) ? req.body.createdBy : ObjectId('5ad85016d66bf94b495b8483');
    adPostData['expiryDated'] = (req.body.expiryDated) ? req.body.expiryDated : new Date(); //need work
    adPostData['notifiy'] = (req.body.notifiy) ? req.body.notifiy : false;
    adPostData['visits'] = (req.body.visits) ? req.body.visits : 0;
    adPostData['replies'] = (req.body.replies) ? req.body.replies : 0;
    adPostData['address'] = (req.body.address) ? req.body.address.trim() : '';
    adPostData['city'] = (req.body.city) ? req.body.city.trim() : '';
    adPostData['region'] = (req.body.region) ? req.body.region.trim() : '';
    adPostData['province'] = (req.body.province) ? req.body.province.trim() : '';
    adPostData['country'] = (req.body.country) ? req.body.country.trim() : '';
    adPostData['photo'] = (req.body.photo) ? req.body.photo : [];

    AdPost.create(adPostData)
    .then(adPost => {
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
    let adPostData = {};
    const adPostId = req.body.adPostId;

    (req.body.postType) ? adPostData['postType'] = req.body.postType.trim() : '';
    (req.body.priority) ? adPostData['priority'] = req.body.priority : '';
    (req.body.title) ? adPostData['title'] = req.body.title.trim() : '';
    (req.body.subtitle) ? adPostData['subtitle'] = req.body.subtitle.trim() : '';
    (req.body.desc) ? adPostData['desc'] = req.body.desc.trim() : '';
    (req.body.body) ? adPostData['body'] = req.body.body.trim() : '';
    (req.body.status) ? adPostData['status'] = req.body.status : '';
    (req.body.createdBy) ? adPostData['createdBy'] = req.body.createdBy : '';
    (req.body.pin) ? adPostData['pin'] = req.body.pin.trim() : '';
    (req.body.expiryDated) ? adPostData['expiryDated'] = req.body.expiryDated : '';
    (req.body.notifiy) ? adPostData['notifiy'] = req.body.notifiy : '';
    (req.body.visits) ? adPostData['visits'] = req.body.visits : '';
    (req.body.replies) ? adPostData['replies'] = req.body.replies : '';
    (req.body.address) ? adPostData['address'] = req.body.address.trim() : '';
    (req.body.city) ? adPostData['city'] = req.body.city.trim() : '';
    (req.body.region) ? adPostData['region'] = req.body.region.trim() : '';
    (req.body.province) ? adPostData['province'] = req.body.province.trim() : '';
    (req.body.country) ? adPostData['country'] = req.body.country.trim() : '';
    (req.body.photo) ? adPostData['photo'] = req.body.photo : '';

    adPostData['lastEdited'] = new Date();

    AdPost.findByIdAndUpdate(adPostId, adPostData)
    .then(adPost => {
      if(!adPost) {
        return res.status(404).json({ data: {
          status : 0,
          msg : "Ad Post not found with id: " + adPostId
      }})};

      return res.status(200).json({ data: {
        status : 1,
        msg : 'Ad post updated successfully'
      }});
    }).catch(err => {
        const ret = Object.assign(err, {status : 0});
        return res.status(401).json(ret);
    });
  }

  delete(req, res) {
    const adPostId = req.params.adPostId;

    AdPost.findByIdAndRemove(adPostId)
    .then(adPost => {
      if(!adPost) {
        return res.status(404).json({ data: {
          status : 0,
          msg : "Ad Post not found with id: " + adPostId
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

}

module.exports = new AdPostController();

/*
postType
priority
title
subtitle
desc
body
status
createdBy
dateCreated
lastEdited
pin
expiryDated
notifiy
visits
replies
address
city
region
province
country
photo
*/
