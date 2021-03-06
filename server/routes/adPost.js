const express = require('express');

const AdPostControllerClass = require('../controllers/adPostController');
const AdPostController = new AdPostControllerClass();

const AuthHelperClass = require('./authHelper');
const AuthHelper = new AuthHelperClass();

const router = new express.Router();


//get ad post filtered by search query
router.get('/search',
  AuthHelper.decryptRequesterUserId,
  AdPostController.getSearch);

//get one ad post field by adpostId
router.get('/field',
  AuthHelper.decryptRequesterUserId,
  AdPostController.getField);

//get all ad posts
router.get('/',
  AuthHelper.decryptRequesterUserId,
  AdPostController.get);

//get one AdPost by adPostId
router.get('/adpost',
  AuthHelper.decryptRequesterUserId,
  AdPostController.getAdPost);

//get one AdPost by userId or createdBy
router.get('/user',
  AuthHelper.decryptRequesterUserId,
  AdPostController.getUserAdPost);

// //test photo
// router.post('/',
//   AuthHelper.parseImages);

//create ad post (auth/plan/index/pays)
router.post('/',
  AuthHelper.authUser,
  AuthHelper.getPlan,
  AuthHelper.getAndIncIndex,
  AuthHelper.userPays,
  AuthHelper.parseImages,
  AdPostController.post);

//update ad post by adpostId (auth)
router.put('/',
  AuthHelper.authUser,
  AuthHelper.parseImages,
  AdPostController.put);

//pin adpost by adpostId (auth/plan/pin/maxquantity/pay)
router.put('/pinned',
  AuthHelper.authUser,
  AuthHelper.getPlan,
  AuthHelper.setPinnedStatus,
  AuthHelper.userPays,
  AdPostController.putPinned);

//boost adpost by adpostId (auth/plan/index/pay)
router.put('/boost',
  AuthHelper.authUser,
  AuthHelper.getPlan,
  AuthHelper.getAndIncIndex,
  AuthHelper.userPays,
  AdPostController.putBoost);

//delete ad post by id
router.delete('/',
  AuthHelper.authUser,
  AdPostController.delete);


module.exports = router;
