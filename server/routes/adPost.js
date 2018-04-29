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

<<<<<<< HEAD
//get one AdPost by adPostId
router.get('/adpost',
  AuthHelper.decryptRequesterUserId,
  AdPostController.getAdPost);

//get one AdPost by userId or createdBy
router.get('/adpost/user',
  AuthHelper.decryptRequesterUserId,
  AdPostController.getUserAdPost);

=======
>>>>>>> 0f5ab38f355bac3588c48b4465838c23363f3e2d
//create ad post (auth/plan/index/pays)
router.post('/',
  AuthHelper.authUser,
  AuthHelper.getPlan,
  AuthHelper.getAndIncIndex,
  AuthHelper.userPays,
  AdPostController.post);

//update ad post by adpostId (auth)
router.put('/',
  AuthHelper.authUser,
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
