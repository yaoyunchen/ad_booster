const express = require('express');

const PricingController = require('../controllers/pricingController');

const router = new express.Router();

//get all pricings
router.get('/', PricingController.get);
//get price by id
router.get('/pricing/:pricingId', PricingController.getPricing);
//create pricing
router.post('/', PricingController.post);
//update pricing by id
router.put('/', PricingController.put);
//delete pricing by id
router.delete('/:pricingId', PricingController.delete);


module.exports = router;
