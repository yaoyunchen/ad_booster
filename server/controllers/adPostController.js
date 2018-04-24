const jwt = require('jsonwebtoken');
const Mongoose = require('mongoose');

const config = require('../../config');

const AdPost = Mongoose.model('AdPost');
const User = Mongoose.model('User');
const Pricing = Mongoose.model('Pricing');
const CollectionIndex = Mongoose.model('CollectionIndex');

const ObjectId = Mongoose.Types.ObjectId;

class AdPostController {
  constructor() {
    this.test = this.test.bind(this); //testing
    this.get = this.get.bind(this);
    this.getSearch = this.getSearch.bind(this);
    this.getField = this.getField.bind(this);
    this.getPinnedCount = this.getPinnedCount.bind(this);
    this.post = this.post.bind(this);
    this.put = this.put.bind(this);
    this.putPinned = this.putPinned.bind(this);
    this.putBoost = this.putBoost.bind(this);
    this.delete = this.delete.bind(this);
    this._userPaysPoints = this._userPaysPoints.bind(this);
    this._checkUserAuthentication = this._checkUserAuthentication.bind(this);
    this._getUserToken = this._getUserToken.bind(this);
  }

  test(req, res) {
    this._checkUserAuthentication(req, (authErr,requesterId,userId) => {
      if (authErr) return res.status(401).json({ msg : "Not authorizated" });
      const data = {
        requesterId : requesterId,
        userId : userId
      };
      return res.status(200).json({data : data});
    });
  }

  get(req, res) {
    return AdPost.find(req.query)
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

  getSearch(req, res) {
    const { field } = req.query;
    const { value } = req.query;

    if(field == null || value == null) return res.status(400).end();

    let query = {};
    query[field] = {"$regex":value,"$options":"i"};

    return AdPost.find(query)
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

  getField(req, res) {
    const { adPostId } = req.query;
    const { field } = req.query;

    if(adPostId == null || field == null) return res.status(400).end();

    const projection = field + " -_id";

    AdPost.findById(adPostId, projection)
    .then(adPost => {
      if(!adPost) return res.status(400).end();
      return res.status(200).json({data : adPost});
    }).catch(err => {
      return res.status(400).end();
    });
  }

  getPinnedCount(req, res) {
    return AdPost.count({pinned : true}).then(pinnedCount => {
      return res.status(200).json(pinnedCount);
    }).catch(err => { return res.status(400).end(); });
  }

  post(req, res) {
    const { id } = req.body;
    const { pricing } = req.body;
    const token = id !== 'null' ? id : this._getUserToken(req);

    let newAdPostData = req.body;
    delete newAdPostData[id];
    delete newAdPostData[pricing];

    //verify user
    return jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) return res.status(401).json({ msg : "Not authorizated"});
      const userId = decoded.sub;
      // const userId = '5ad6cec442bcfd04f7e51483' //testing
      return Pricing.findOne({ name : pricing }).then(pricingData => {
        if(!pricingData) return res.status(401).json({ msg : "Can not find matching pricing"});
        const price = pricingData.price;
        //find user to check points
        return User.findById(userId).then(userData => {
          if(!userData) return res.status(401).json({ msg : "Can not find User"});
          //check sufficient points
          if(userData.points > price){
            //find index to update ad post
            return CollectionIndex.findOne({name : "std_post_adpost"})
            .then(collectionIndex => {
              if(!collectionIndex) return res.status(401).json({ msg : "Can not find collection index"});
              const newIndex = collectionIndex.index+1;
              newAdPostData['priority'] = newIndex;
              //update collectionIndex
              CollectionIndex.findByIdAndUpdate(collectionIndex.id, { index : newIndex }).catch( err => {return res.status(401).json(err); });
              // post ad
              return AdPost.create(newAdPostData).then(adPost => {
                //reduce points
                const newPrice = userData.points - price;
                User.findByIdAndUpdate(userId, { points : newPrice}).catch( err => {return res.status(401).json(err); });
                  return res.status(200).json({
                    data: {
                      status: 1,
                      success: true,
                      message: 'Ad post created successfully'
                    }
                  });
                }).catch( err => {return res.status(401).json(err); });
            });
          } else {
            return res.status(200).json({
              msg : "not enough points"
            });
          }
        });
      })
    });
  }

  put(req, res) {
    const { id } = req.body;
    const { adPostId } = req.body;
    const token = id !== 'null' ? id : this._getUserToken(req);
    return jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) return res.status(401).json({ msg : "Not authorizated"});
      const userId = decoded.sub;

      let adPostData = req.body;
      adPostData['lastEdited'] = new Date();
      delete adPostData[id];
      delete adPostData[adPostId];

      return AdPost.findByIdAndUpdate(adPostId, adPostData)
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
    });
  }

  putPinned(req, res) {
    const { adPostId } = req.body;
    //check request authentication
    return this._checkUserAuthentication(req, (authErr,requesterId,userId) => {
      if (authErr) return res.status(401).json({ msg : "Not authorizated" });
      //find pricing
      return Pricing.findOne({ name : 'std_pin_adpost' }).then(pricingData => {
        if(!pricingData) return res.status(404).json({ msg : "Can not find matching pricing"});
        const price = pricingData.price;
        const maxQuantity = pricingData.maxQuantity;
        //check if ad post is pinned already
        return AdPost.findById(adPostId,"pinned").then(adPost => {
          if(!adPost) return res.status(404).json({ msg : "Ad post by Id not found." });
          if(adPost.pinned == true) return res.status(200).json({ msg : "Ad post is already pinned. Request aborted." });
          //pin ad post
          return findByIdAndUpdate(adPostId, {pinned : true}).then(pinnedCount => {
            //check count of pinned posts
            return AdPost.count({pinned : true}).then(pinnedCount => {
              if(pinnedCount <= maxQuantity){
                //charge user for price amount
                return this._userPaysPoints(requesterId,userId,price,(err,msg) => {
                  if(!err){
                    return res.status(200).json({ msg : "ad post pinned successfully" });
                  } else {
                    //charge user failed, unpin and return error
                    AdPost.findByIdAndUpdate(adPostId, {pinned : false});
                    return res.status(404).json({ msg : err });
                  }
                });
              } else {
                //more than max allowed pin number. unpin post and return failed
                AdPost.findByIdAndUpdate(adPostId, {pinned : false});
                return res.status(200).json({ msg : 'There are more than ' + maxQuantity + 'pinned Post. Pin failed.' });
              }
            }).catch(err => { return res.status(400).json({}); });
          }).catch(err => { return res.status(400).json({}); });
        }).catch(err => { return res.status(400).json({}); });
      });
    });
  }

  putBoots(req, res) {
    const { adPostId } = req.body;
    return this._checkUserAuthentication(req, (authErr,requesterId,userId) => {
      if (authErr) return res.status(401).json({ msg : "Not authorizated" });
      //find pricing
      return Pricing.findOne({ name : 'std_boost_adpost' }).then(pricingData => {
        if(!pricingData) return res.status(404).json({ msg : "Can not find matching pricing"});
        const price = pricingData.price;
        //charge user for price amount
        return this._userPaysPoints(requesterId,userId,price,(err,msg) => {
          if(!err){
            return res.status(200).json({ msg : "ad post pinned successfully" });
          };
        });

      });
    });
  }

  delete(req, res) {
    const { id } = req.body;
    const adPostId = req.params.adPostId;

    const token = id !== 'null' ? id : this._getUserToken(req);
    return jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) return res.status(401).json({ msg : "Not authorizated"});
      const userId = decoded.sub;
        return AdPost.findByIdAndRemove(adPostId)
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

    });
  }

  _userPaysPoints(requesterId,userId,price,callback){
    //find user to check sufficient points
    return User.findById(userId).then(userData => {
      if(!pricingData) callback("Can not find User", "");
      //check sufficient points
      if(userData.points > price){
        //find index to update ad post
        return User.findByIdAndUpdate(userId, { points : newPrice}).then(userData => {
          //update ledger
          const newLedger = {
            type : pricingData.name,
            price : price,
            userId : userId,
            requesterId : requesterId
          };
          return Ledger.insertOne(newLedger).then(ledgerData => {
            callback("", "Charged User: " + userId + " $" + price + ".");
          }.catch( err => {callback(err, "")});
        }).catch( err => {callback(err, "")});
      } else {
        //not sufficient points
        callback("User has insuffient points!", "");
      }
    });
  }

  _checkUserAuthentication(req,callback){
    //check request header and get userId and requesterId
    const token = req.headers.authorization.split(' ')[1];
    return jwt.verify(token, config.jwtSecret, (err, decoded) => {
      const requesterId = decoded.sub;
      const userId = req.body.userId ? req.body.userId : requesterId;
      callback(err,requesterId,userId);
    });
  }

  _getUserToken(req) {
    if (!req.headers.authorization) return;
    return req.headers.authorization.split(' ')[1];
  }
}

module.exports = new AdPostController();
