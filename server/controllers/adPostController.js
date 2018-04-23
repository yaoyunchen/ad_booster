const jwt = require('jsonwebtoken');
const Mongoose = require('mongoose');

const config = require('../../config');

const AdPost = Mongoose.model('AdPost');
const CollectionIndex = Mongoose.model('CollectionIndex');

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

  getUserAdPosts(req, res) {
    const { userId } = req.query;
    const token = userId !== 'null' ? userId : req.headers.authorization.split(' ')[1];

    return jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) return res.status(401).end();

      const id = decoded.sub;

      return AdPost.find({ createdBy: ObjectId(id) }).then(adPost => {
        return res.status(200).json({
          status: 1,
          data: adPost
        });
      }).catch(err => {
        const ret = Object.assign(err, { status: 0 });
        return res.status(401).json(ret);
      });
    });
  }

  getStatus(req, res) {
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
        data : adPost.status
      });
    }).catch(err => {
        const ret = Object.assign(err, {status : 0});
        return res.status(401).json(ret);
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
    const params = req.query;
    const adPostData = {};
    const token = this._getUserToken(req);

    return jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) return res.status(401).end();

      const userId = ObjectId(decoded.sub);

      adPostData.postType = (params.postType && params.postType.trim()) || '';
      adPostData.title = (params.title && params.title.trim()) || '';
      adPostData.subtitle = (params.subtitle && params.subtitle.trim()) || '';
      adPostData.desc = (params.desc && params.desc.trim()) || '';
      adPostData.body = (params.body && params.body.trim()) || '';
      adPostData.status = params.status || '';
      adPostData.createdBy = userId || '';
      adPostData.expiryDated = params.expiryDated || undefined;
      adPostData.notify = params.notifiy || false;
      adPostData.visits = params.visits || 0;
      adPostData.replies = params.replies || 0;
      adPostData.address = (params.address && params.address.trim()) || '';
      adPostData.city = (params.city && params.city.trim()) || '';
      adPostData.region = (params.region && params.region.trim()) || '';
      adPostData.province = (params.province && params.province.trim()) || '';
      adPostData.country = (params.country && params.country.trim()) || '';
      adPostData.photo = params.photo || [];

      AdPost.create(adPostData)
        .then(adPost => {
          return res.status(200).json({
            data: {
              status: 1,
              success: true,
              message: 'Ad post created successfully'
            }
          });
        }).catch(err => {
          const ret = Object.assign(err, {
            status: 0,
            success: false,
            message: 'Error creating ad post.'
          });
          return res.status(401).json(ret);
        });
    });

    // CollectionIndex.findById('5ada9fbd7a3d620e112ed24b')
    //   .then(collectionIndex => {
    //     if (!collectionIndex) {
    //       return res.status(404).json({
    //         data: {
    //           status: 0,
    //           msg: "Index not found with id: 5ada9fbd7a3d620e112ed24b. Can not get index."
    //         }
    //       })
    //     };

    //     const newIndex = collectionIndex.index + 1;
    //     adPostData['priority'] = newIndex;

    //     CollectionIndex.findByIdAndUpdate('5ada9fbd7a3d620e112ed24b', { index: newIndex })
    //       .then(adPost => {
    //         if (!adPost) {
    //           return res.status(404).json({
    //             data: {
    //               status: 0,
    //               msg: "Index not found with id: 5ada9fbd7a3d620e112ed24b"
    //             }
    //           })
    //         };
    //       }).catch(err => {
    //         const ret = Object.assign(err, { status: 0 });
    //         return res.status(401).json(ret);
    //       });

    //     AdPost.create(adPostData)
    //       .then(adPost => {
    //         return res.status(200).json({
    //           data: {
    //             status: 1,
    //             msg: 'Ad post created successfully'
    //           }
    //         });
    //       }).catch(err => {
    //         const ret = Object.assign(err, { status: 0 });
    //         return res.status(401).json(ret);
    //       });

    //   }).catch(err => {
    //     const ret = Object.assign(err, { status: 0 });
    //     return res.status(401).json(ret);
    //   });
  }

  put(req, res) {
    let adPostData = {};
    const params = re
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

  _getUserToken(req) {
    if (!req.headers.authorization) return;
    return req.headers.authorization.split(' ')[1];
  }
}

module.exports = new AdPostController();
