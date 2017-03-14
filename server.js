var express = require('express')
var body = require('body-parser')
var http = require('http')
var path = require('path')
var logger = require('morgan')

var loginRouter = require('./server/routes/login') 
var yelpRouter = require('./server/routes/yelp')
require('dotenv').config()

const app = express()

app.disable('x-powered-by')

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
};

app.use(allowCrossDomain);

app.use(logger('dev'))
app.use(body.json())
app.use(body.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'dist')))

app.use('/api/login', loginRouter)
app.use('/api/yelp', yelpRouter)

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