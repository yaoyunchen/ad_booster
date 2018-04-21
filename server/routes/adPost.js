const express = require('express');

const AdPostController = require('../controllers/adPostController');

const router = new express.Router();

//get all ad posts
router.get('/', AdPostController.get);
//get all ad posts by user
router.get('/userAdPosts/:userId', AdPostController.getUserAdPosts);
//get all ad posts by status
router.get('/status/:adPostId', AdPostController.getStatus);
//get ad post by id
router.get('/adPost/:adPostId', AdPostController.getAdPost);
//create ad post
router.post('/', AdPostController.post);
//update ad post by id
router.put('/', AdPostController.put);
//delete ad post by id
router.delete('/:adPostId', AdPostController.delete);


module.exports = router;
