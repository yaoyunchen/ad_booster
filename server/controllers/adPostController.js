const jwt = require('jsonwebtoken');
const Mongoose = require('mongoose');

const config = require('../../config');

const AdPost = Mongoose.model('AdPost');
const CollectionIndex = Mongoose.model('CollectionIndex');

const ObjectId = Mongoose.Types.ObjectId;

class AdPostController {
  constructor() {
    this.get = this.get.bind(this);
    this.getSearch = this.getSearch.bind(this);
    this.getField = this.getField.bind(this);
    this.post = this.post.bind(this);
    this.put = this.put.bind(this);
    this.putPinned = this.putPinned.bind(this);
    this.delete = this.delete.bind(this);
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

    if(field == null || value == null) return res.status(401).end();

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

    if(adPostId == null || field == null) return res.status(401).end();

    const projection = field + " -_id";

    AdPost.findById(adPostId, projection)
    .then(adPost => {
      if(!adPost) return res.status(401).end();
      return res.status(200).json({data : adPost});
    }).catch(err => {
      return res.status(401).end();
    });
  }

  post(req, res) {
    CollectionIndex.find({name : "ad_post"})
    .then(collectionIndex => {
      if(!collectionIndex) return res.status(401).end();

      const newIndex = collectionIndex.index+1;
      adPostData['priority'] = newIndex;

      CollectionIndex.findByIdAndUpdate(collectionIndex._id, { index : newIndex })
      .then(adPost => {
        if(!adPost) return res.status(401).end();
      }).catch(err => {
          const ret = Object.assign(err, {status : 0});
          return res.status(401).json(ret);
      });

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

    }).catch(err => {
        const ret = Object.assign(err, {status : 0});
        return res.status(401).json(ret);
    });
  }

  put(req, res) {
    // let adPostData = {};
    const adPostId = req.body.adPostId;

    req.body['lastEdited'] = new Date();

    AdPost.findByIdAndUpdate(adPostId, req.body)
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

  putPinned(req, res) {
    const adPostId = req.body.adPostId;
    const maxPinCount = 5;

    //check if postId is pinned already
    return findById(adPostId,"pinned").then(adPost => {
      if(!adPost) return res.status(401).end();
      if(adPost.pinned == true) return res.status(200).json({
        status : 1,
        msg : 'Ad post is already pinned. Request aborted.'
      });

      //check count of pinned posts
      return AdPost.count({pinned : true}).then(pinnedCount => {
        if(pinnedCount <= maxPinCount){
          //pinn post
          return findByIdAndUpdate(adPostId, {pinned : true}).then(pinnedCount => {

          }).catch(err => {
            const ret = Object.assign(err, {status : 0});
            return res.status(401).json(ret);
          });
        } else {
          return res.status(200).json({ data: {
            status : 2,
            msg : 'There are more than ' + maxPinCount + 'pinned Post. Pin failed.'
          }});
        }
      }).catch(err => {
        const ret = Object.assign(err, {status : 0});
        return res.status(401).json(ret);
      });

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
