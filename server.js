var express = require('express')
var body = require('body-parser')
var http = require('http')
var path = require('path')
var logger = require('morgan')
var session = require('express-session')
// twitter Oauth Passport setup
var passport = require('passport')
  , TwitterStrategy = require('passport-twitter').Strategy;

var loginRouter = require('./server/routes/login') 
var yelpRouter = require('./server/routes/yelp')
var userRouter = require('./server/routes/user')
var config = require('./server/controllers/config');
require('dotenv').config();

var patrons = require('./server/controllers/patrons')

config.connect().then(output => console.log('connection success'));

const app = express()

app.disable('x-powered-by')

app.use(logger('dev'))
app.use(body.json())
app.use(require('cookie-parser')())
app.use(body.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'dist')))
app.use(require('express-session')({
  secret: 'keyboard kitten',
  resave: true,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/api/login', loginRouter)
app.use('/api/yelp', yelpRouter)
app.use('/api/user', userRouter)



passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_KEY,
    consumerSecret: process.env.TWITTER_SECRET,
    callbackURL: process.env.TWITTER_CALLBACK
  },
  function(token, tokenSecret, profile, done) {
    patrons.update({id: profile.id})
    done(null, profile)
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  next(err);
});

app.use(function(err, req, res, next) {

  res.status(err.status || 500);
  res.json({
    error: {},
    message: err.message
  });
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));