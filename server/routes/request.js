const express = require('express');

const RequestControllerClass = require('../controllers/requestController');
const RequestController = new RequestControllerClass();

const router = new express.Router();

//create request
router.post('/',RequestController.post);
//delete request by id
router.delete('/:requestId',RequestController.delete);

module.exports = router;
