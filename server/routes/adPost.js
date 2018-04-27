const express = require('express');

const AdPostController = require('../controllers/adPostController');

const AdPost = new AdPostController();
const router = new express.Router();

//get all ad posts by user
router.get('/userAdPosts', AdPost.getUserAdPosts);

//get all ad posts by status
router.get('/status/:adPostId', AdPost.getStatus);

//get ad post by id
router.get('/:adPostId', AdPost.getAdPost);

//get all ad posts
router.get('/', AdPost.get);

//create ad post
router.post('/', AdPost.post);
//update ad post by id
router.put('/', AdPost.put);
//delete ad post by id
router.delete('/:adPostId', AdPost.delete);


module.exports = router;
