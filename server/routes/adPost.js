const express = require('express');

const AdPostController = require('../controllers/adPostController');

const router = new express.Router();


//get all ad posts by user
router.get('/search', AdPostController.getSearch);
//get all ad posts by user
router.get('/field', AdPostController.getField);
//get all ad posts
router.get('/', AdPostController.get);
//create ad post
router.post('/', AdPostController.post);
//update ad post by id
router.put('/', AdPostController.put);
//update ad post by id
router.put('/pinned', AdPostController.putPinned);
//update ad post by id
router.put('/boost', AdPostController.putPinned);
//delete ad post by id
router.delete('/:adPostId', AdPostController.delete);


module.exports = router;
