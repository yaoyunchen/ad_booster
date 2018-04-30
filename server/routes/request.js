const express = require('express');

const RequestControllerClass = require('../controllers/requestController');
const RequestController = new RequestControllerClass();

const AuthHelperClass = require('./authHelper');
const AuthHelper = new AuthHelperClass();

const router = new express.Router();

//create request
router.post('/',
  AuthHelper.authUser,
  RequestController.post);
//delete request by id
router.delete('/:requestId',
  AuthHelper.authUser,
  RequestController.delete);

module.exports = router;
