const jwt = require('jsonwebtoken');
const Mongoose = require('mongoose');

const config = require('../../config');
const Pricing = Mongoose.model('Pricing');

const ObjectId = Mongoose.Types.ObjectId;

class PricingController {
  constructor() {
    this.get = this.get.bind(this);
    this.getPricing = this.getPricing.bind(this);
    this.post = this.post.bind(this);
    this.put = this.put.bind(this);
    this.delete = this.delete.bind(this);
  }

  get(req, res) {
    Pricing.find()
    .then(pricing => {
      return res.status(200).json({
        status : 1,
        data : pricing
      });
    }).catch(err => {
      const ret = Object.assign(err, {status : 0});
      return res.status(401).json(ret);
    });
  }

  getPricing(req, res) {
    const pricingId = req.params.pricingId;

    Pricing.findById(pricingId)
    .then(pricing => {
      if(!pricing) {
        return res.status(404).json({ data: {
          status : 0,
          msg : "Pricing not found with id: " + pricingId
      }})};

      return res.status(200).json({
        status : 1,
        data : pricing
      });
    }).catch(err => {
        const ret = Object.assign(err, {status : 0});
        return res.status(401).json(ret);
    });
  }

  post(req, res) {
    //User data
    let pricingData = {};

    (req.body.name) ? pricingData['name'] = req.body.name.trim() : '';
    (req.body.price) ? pricingData['price'] = req.body.price : '';
    (req.body.type) ? pricingData['type'] = req.body.type.trim() : '';
    (req.body.desc) ? pricingData['desc'] = req.body.desc.trim() : '';
    (req.body.editedBy) ? pricingData['editedBy'] = ObjectId(req.body.editedBy.trim()) : '';

    Pricing.create(pricingData)
    .then(pricing => {
        return res.status(200).json({ data: {
          status : 1,
          msg : 'Pricing created successfully'
        }});
    }).catch(err => {
        const ret = Object.assign(err, {status : 0});
        return res.status(401).json(ret);
    });

  }

  put(req, res) {
    let pricingData = {};
    const pricingId = req.body.pricingId;

    (req.body.name) ? pricingData['name'] = req.body.name.trim() : '';
    (req.body.price) ? pricingData['price'] = req.body.price : '';
    (req.body.type) ? pricingData['type'] = req.body.type.trim() : '';
    (req.body.desc) ? pricingData['desc'] = req.body.desc.trim() : '';
    (req.body.status) ? pricingData['status'] = req.body.status.trim() : '';
    (req.body.editedBy) ? pricingData['editedBy'] = ObjectId(req.body.editedBy.trim()) : '';

    pricingData['lastEdited'] = new Date();

    Pricing.findByIdAndUpdate(pricingId, pricingData)
    .then(pricing => {
      if(!pricing) {
        return res.status(404).json({ data: {
          status : 0,
          msg : "Pricing not found with id: " + pricingId
      }})};

      return res.status(200).json({ data: {
        status : 1,
        msg : 'Pricing updated successfully'
      }});
    }).catch(err => {
        const ret = Object.assign(err, {status : 0});
        return res.status(401).json(ret);
    });
  }

  delete(req, res) {
    const pricingId = req.params.pricingId;

    Pricing.findByIdAndRemove(pricingId)
    .then(pricing => {
      if(!pricing) {
        return res.status(404).json({ data: {
          status : 0,
          msg : "Pricing not found with id: " + pricingId
      }})};

      return res.status(200).json({
        status : 1,
        msg : 'Pricing deleted successfully'
      });
    }).catch(err => {
      const ret = Object.assign(err, {status : 0});
      return res.status(401).json(ret);
    });
  }

}

module.exports = new PricingController();
