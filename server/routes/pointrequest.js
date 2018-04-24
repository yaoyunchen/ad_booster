const express = require('express');

const PointRequestController = require('../controllers/pointRequestController');

const router = new express.Router();

//create request
router.post('/',PointRequestController.post);
//fulfill request
router.put('/:requestId/fulfill',PointRequestController.putFulfill);
//delete request by id
router.delete('/:requestId',PointRequestController.delete);

module.exports = router;
