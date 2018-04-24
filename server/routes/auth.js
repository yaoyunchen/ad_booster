const express = require('express');
const validator = require('validator');
const passport = require('passport');

const User = require('../controllers/userController');
const AdPost = require('../controllers/adPostController');

const router = new express.Router();


/* eslint-disable max-statements */
/* TODO: Refactor this */
const validateSignUpForm = (payload) => {
  const errors = {};
  let isFormValid = true;
  let message = '';

  // TODO: Change the username length in prod.
  if (!payload || typeof payload.username !== 'string' || payload.username.trim().length < 3) {
    isFormValid = false;
    errors.username = 'Username must have at least 3 characters.';
  }

  if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
    isFormValid = false;
    errors.email = 'Please provide a correct email address.';
  }

  // TODO: Change the value back up in production.
  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 3) {
    isFormValid = false;
    errors.password = 'Password must have at least 3 characters.';
  }

  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  return {
    success: isFormValid,
    message,
    errors
  };
};

const validateLoginForm = (payload) => {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.username !== 'string' || payload.username.trim().length === 0) {
    isFormValid = false;
    errors.username = 'Please provide your username.';
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
    isFormValid = false;
    errors.password = 'Please provide your password.';
  }

  if (!isFormValid) message = 'Check the form for errors.';

  return {
    success: isFormValid,
    message,
    errors
  };
};

const validateUserEditForm = data => {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!data || typeof data.email !== 'string' || !validator.isEmail(data.email)) {
    isFormValid = false;
    errors.email = 'Please provide a correct email address.';
  }

  if (!isFormValid) message = 'Check the form for errors.';

  return {
    success: isFormValid,
    message,
    errors
  };
};

router.put('/user/edit', (req, res, next) => {
  const result = validateUserEditForm(req.query);
  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: result.message,
      errors: result.errors
    });
  }

  return User.put(req, res);
});

const validateAdPostForm = data => {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!isFormValid) message = 'Check the form for errors.';

  return {
    success: isFormValid,
    message,
    errors
  };
}

router.post('/adPost', (req, res, next) => {
  const result = validateAdPostForm(req.query);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: result.message,
      errors: result.errors
    });
  }
  return AdPost.post(req, res);
});

router.post('/signup', (req, res, next) => {
  const validationResult = validateSignUpForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  }

  return passport.authenticate('local-signup', (err) => {
    if (err) {
      console.log('SIGNUP FAILED:', err);
      // 11000 error code is for duplicate email error
      // 409 HTTP status is for conflict error
      if (err.code === 11000) {
        return res.status(409).json({
          success: false,
          message: 'Check the form for errors.',
          errors: {
            email: 'This email is already taken.'
          }
        });
      }

      return res.status(400).json({
        success: false,
        message: 'Could not process the form.'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'You have successfully signed up! Now you should be able to log in.'
    });
  })(req, res, next);
});

router.post('/login', (req, res, next) => {
  const validationResult = validateLoginForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  }

  return passport.authenticate('local-login', (err, token, userData) => {
    if (err) {
      console.log('LOGIN FAILED: ', err);

      if (err.name === 'IncorrectCredentialsError') {
        return res.status(400).json({
          success: false,
          message: err.message
        });
      }

      return res.status(400).json({
        success: false,
        message: 'Could not process the form.'
      });
    }

    return res.json({
      success: true,
      message: 'You have successfully logged in!',
      token,
      user: userData
    });
  })(req, res, next);
});

module.exports = router;
