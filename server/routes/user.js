const express = require('express');

const UserController = require('../controllers/userController');

const router = new express.Router();

//get user by id
router.get('/', UserController.get);
//get user is admin true/false by id
router.get('/isAdmin', UserController.getIsAdmin);
//get all active users
router.get('/users',UserController.getUsers);
//get user points by id
router.get('/points',UserController.getPoints);
//create user
router.post('/',UserController.post);
//update user by id
router.put('/user',UserController.put);
//delete user by id
router.delete('/:userId',UserController.delete);

module.exports = router;
