const express = require('express');

const UserControllerClass = require('../controllers/userController');
const UserController = new UserControllerClass();

const router = new express.Router();

//get user by id
router.get('/', UserController.get);
//get user is admin true/false by id
router.get('/isAdmin', UserController.getIsAdmin);
//get all active users
router.get('/users',UserController.getUsers);
//get user points by id
router.get('/field',UserController.getField);
//create user
router.post('/',UserController.post);
//update user by id
router.put('/user',UserController.put);
//delete user by id
router.delete('/:userId',UserController.delete);

module.exports = router;
