const express = require('express');

const UserController = require('../controllers/userController');

const router = new express.Router();

router.get('/', UserController.get);
router.get('/isAdmin', UserController.getIsAdmin);

module.exports = router;
