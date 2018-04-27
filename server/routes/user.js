const express = require('express');

const UserController = require('../controllers/userController');

const User = new UserController();

const router = new express.Router();

//get user by id
router.get('/', User.get);
//get user is admin true/false by id
router.get('/isAdmin', User.getIsAdmin);
//get all active users
router.get('/users', User.getUsers);
//get user points by id
router.get('/points', User.getPoints);
//create user
router.post('/', User.post);
//update user by id
router.put('/user', User.put);
//delete user by id
router.delete('/:userId', User.delete);

module.exports = router;
