const express = require('express');

const UserControllerClass = require('../controllers/userController');
const UserController = new UserControllerClass();

const AuthHelperClass = require('./authHelper');
const AuthHelper = new AuthHelperClass();

const router = new express.Router();

//get user by id
router.get('/', UserController.get);
//get user is admin true/false by id
router.get('/isAdmin', UserController.getIsAdmin);
//get all active users
router.get('/users',
  AuthHelper.authUser,
  UserController.getUsers);
//get user points by id
router.get('/field',
  AuthHelper.authUser,
  UserController.getField);
//create user
router.post('/',
  AuthHelper.decryptRequesterUserId,
  UserController.post);
//update user by id
router.put('/',
  AuthHelper.authUser,
  UserController.put);
//add points to user
router.put('/addpoints',
  // AuthHelper.authUser,
  AuthHelper.fulfillRequest,
  UserController.putAddPoints);
//delete user by id
router.delete('/',
  AuthHelper.authUser,
  UserController.delete);

module.exports = router;
