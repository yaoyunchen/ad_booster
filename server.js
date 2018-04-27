const express = require('express');
// const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');
const bb = require('express-busboy');

const config = require('./config');

// Connect to database & load models
require('./server/models').connect(config.dbUrl);


const app = express();

bb.extend(app, {
  upload: true
});

// Static file locations
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'build')));

// Parse HTTP body messages
// app.use(bodyParser.urlencoded({ extended: false }));


// CORs settings for requests
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// Passport
app.use(passport.initialize());

const localSignupStrategy = require('./server/passport/local-signup');
passport.use('local-signup', localSignupStrategy);

const localLoginStrategy = require('./server/passport/local-login');
passport.use('local-login', localLoginStrategy);

// Authentication middleware
const authCheckMiddleware = require('./server/middleware/auth-check');
app.use('/api', authCheckMiddleware);


// Routes
app.get('/ping', function (req, res) {
  return res.send('pong');
});

const authRoutes = require('./server/routes/auth');
app.use('/auth', authRoutes);

const apiRoutes = require('./server/routes/api');
app.use('/api', apiRoutes);

const userRoutes = require('./server/routes/user');
app.use('/user', userRoutes);

const adPostRoutes = require('./server/routes/adPost');
app.use('/adPost', adPostRoutes);

const planRoutes = require('./server/routes/plan');
app.use('/plan', planRoutes);

const requestRoutes = require('./server/routes/request');
app.use('/request', requestRoutes);

//Start the server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`); // eslint-disable-line no-console
});
