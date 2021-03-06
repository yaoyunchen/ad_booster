const Mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const config = require('../../config');

const helperClass = require('./controllerHelper');
const helper = new helperClass();

const AdPost = Mongoose.model('AdPost');

class AdPostController {
  constructor() {
    this.get = this.get.bind(this);
    this.getAdPost = this.getAdPost.bind(this);
    this.getUserAdPost = this.getUserAdPost.bind(this);
    this.getSearch = this.getSearch.bind(this);
    this.getField = this.getField.bind(this);
    this.post = this.post.bind(this);
    this.put = this.put.bind(this);
    this.putPinned = this.putPinned.bind(this);
    this.putBoost = this.putBoost.bind(this);
    this.delete = this.delete.bind(this);

    this.decrypt = this.decrypt.bind(this);
  }


  decrypt(token) {
    return jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) return '';
      return decoded.sub;
    });
  }

  get(req, res) {
    return AdPost.find(req.query).sort({ priority: -1 }).then(adPost => {
      if(!adPost.length) return helper.retError(res,'400',true,'','No matching results get',adPost);
      return helper.retSuccess(res,'200',true,'','Sucess',adPost);
    }).catch(err => {
      return helper.retError(res,'500',false,err,'Error get','');
    });
  }

  getAdPost(req, res) {
    const { adPostId } = req.query;

    return AdPost.findById(adPostId).then(adPost => {
      if (!adPost) return helper.retError(res, '400', true, '','No matching results getAdPost',adPost);
      return helper.retSuccess(res,'200',true,'','Sucess',adPost);
    }).catch(err => {
      return helper.retError(res,'500',false,err,'Error getAdPost','');
    });
  }

  getUserAdPost(req, res) {
    const createdBy = (req.query.createdById) ? req.query.createdById : req.query.requesterId;

    return AdPost.find({ createdBy }).sort({ priority: -1 }).then(adPost => {
      if (!adPost) return helper.retError(res, '400', true, '','No matching results getUserAdPost',adPost);
      return helper.retSuccess(res,'200',true,'','Sucess',adPost);
    }).catch(err => {
      return helper.retError(res,'500',false,err,'Error getUserAdPost','');
    });
  }

  getSearch(req, res) {
    console.log(req.query);
    let query = {
      status : 'active'
    };
    //build query
    if(req.query.search){
      let queryRgex = [];
      const searchArr = req.query.search.split(" ");
      //loop all words in search and push to queryRgex
      searchArr.forEach(function(word) {
        (req.query.title) ? query['title'] = req.query.title : queryRgex.push({ title : { "$regex":word,"$options":"i" } });
        (req.query.subtitle) ? query['subtitle'] = req.query.subtitle : queryRgex.push({ subtitle : { "$regex":word,"$options":"i"} });
        (req.query.desc) ? query['desc'] = req.query.desc : queryRgex.push({ desc : { "$regex":word,"$options":"i" } });
        (req.query.gender) ? query['gender'] = req.query.gender : queryRgex.push({ gender : { "$regex":word,"$options":"i" } });
        (req.query.province) ? query['province'] = req.query.province : queryRgex.push({ province : { "$regex":word,"$options":"i"} });
        (req.query.age) ? query['age'] = req.query.age : queryRgex.push({ age : { "$regex":word,"$options":"i" } });
        (req.query.ethnicity) ? query['ethnicity'] = req.query.ethnicity : queryRgex.push({ ethnicity : { "$regex":word,"$options":"i"} });
        (req.query.region) ? query['region'] = req.query.region : queryRgex.push({ region : { "$regex":word,"$options":"i" } });
        (req.query.availability == 'both') ? query = Object.assign(query, { $or : [{ availability : 'in' }, { availability : 'out' }] }) : query['availability'] = req.query.availability;
      });
      query = Object.assign(query, { $or : queryRgex});
    } else {
      if (req.query.title) query['title'] = req.query.title;
      if (req.query.subtitle) query['subtitle'] = req.query.subtitle;
      if (req.query.desc) query['desc'] = req.query.desc;
      if (req.query.gender) query['gender'] = req.query.gender;
      if (req.query.province) query['province'] = req.query.province;
      if (req.query.age) query['age'] = req.query.age;
      if (req.query.ethnicity) query['ethnicity'] = req.query.ethnicity;
      if (req.query.region) query['region'] = req.query.region;
      if (req.query.availability) {
        (req.query.availability == 'both') ? query = Object.assign(query, { $or : [{ availability : 'in' }, { availability : 'out' }] }) : query['availability'] = req.query.availability;
      }
    }

    if(query == {status : 'active'}) return helper.retError(res,'404',false,err,'Error: Invalid Search','');
    return AdPost.find(query).sort({ priority: -1 }).then(adPost => {
      if (!adPost.length) return helper.retError(res, '400', true, '','No matching results getSearch',adPost);
      return helper.retSuccess(res,'200',true,'','Sucess',adPost);
    }).catch(err => {
      return helper.retError(res,'500',false,err,'Error getSearch','');
    });
  }

  getField(req, res) {
    const { adPostId } = req.query;
    const { field } = req.query;

    if(adPostId == null || field == null) return res.status(400).end();

    const projection = field + " -_id";

    return AdPost.findById(adPostId, projection).then(adPost => {
      if (!adPost.length) return helper.retError(res, '400', true, '','No matching results getField',adPost);
      return helper.retSuccess(res,'200',true,'','Sucess',adPost);
    }).catch(err => {
      return helper.retError(res,'500',false,err,'Error getField','');
    });
  }

  post(req, res) {
    //build create query
    let newAdPostData = req.body;
    newAdPostData['priority'] = req.body.data.collectionIndex;
    newAdPostData['createdBy'] = req.body.requesterId;
    newAdPostData['editedBy'] = req.body.requesterId;
    delete newAdPostData["data"];

    AdPost.create(newAdPostData).then(adPost => {
      return helper.retSuccess(res,'200',true,'','Sucess','');
    }).catch(err => {
      return helper.retError(res,'500',false,err,'Error post','');
    });
  }

  put(req, res) {
    const { adPostId } = req.body;
    //build update query
    let adPostData = req.body;
    delete adPostData["data"];
    adPostData['editedBy'] = req.body.requesterId;
    adPostData['lastEdited'] = new Date();

    return AdPost.findByIdAndUpdate(adPostId, adPostData).then(adPost => {
      return helper.retSuccess(res,'200',true,'','Sucess',adPost);
    }).catch(err => {
      return helper.retError(res,'500',false,err,'Error put','');
    });
  }

  putPinned(req, res) {
    const { adPostId } = req.body;

    //set expiryDate
    let pinExpiryDate = new Date();
    const pinnedDays = req.body.data.plan.interval;
    pinExpiryDate.setDate(pinExpiryDate.getDate() + pinnedDays);
    //build update query
    const updatePin = {
      pinned : true,
      pinnedDate : new Date(),
      pinExpiryDate : pinExpiryDate,
      editedBy : req.body.requesterId,
      lastEdited : new Date()
    };

    AdPost.findByIdAndUpdate(adPostId, updatePin).then(adPost => {
      return helper.retSuccess(res,'200',true,'','Sucess',adPost);
    }).catch(err => {
      return helper.retError(res,'500',false,err,'Error putPinned','');
    });
  }

  putBoost(req, res) {
    const { adPostId } = req.body;
    const updatePriority = {
      priority : req.body.data.collectionIndex,
      editedBy : req.body.requesterId,
      boostedDate: new Date(),
      lastEdited : new Date()
    };

    AdPost.findByIdAndUpdate(adPostId, updatePriority).then(adPost => {
      return helper.retSuccess(res,'200',true,'','Sucess', adPost);
    }).catch(err => {
      return helper.retError(res,'500',false,err,'Error putBoost','');
    });
  }

  delete(req, res) {
    const { adPostId } = req.body;

    return AdPost.findByIdAndRemove(adPostId).then(adPost => {
      return helper.retSuccess(res,'200',true,'','Sucess', adPost);
    }).catch(err => {
      return helper.retError(res,'500',false,err,'Error delete','');
    });
  }

}

module.exports = AdPostController;
