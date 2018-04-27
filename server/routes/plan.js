const express = require('express');

const PlanControllerClass = require('../controllers/planController');
const PlanController = new PlanControllerClass();

const router = new express.Router();

//get all plans
router.get('/', PlanController.get);
//get price by id
router.get('/getPlan', PlanController.getPlan);
//create plan
router.post('/', PlanController.post);
//update plan by id
router.put('/', PlanController.put);
//delete plan by id
router.delete('/', PlanController.delete);


module.exports = router;
