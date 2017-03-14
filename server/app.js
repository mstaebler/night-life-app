var express = require('express')
var body = require('body-parser')

var loginRouter = require('./routes/login') 
var yelpRouter = require('./routes/yelp')
var publicRouter = require('./routes/public')

const app = express()

app.disable('x-powered-by')

app.use(body.json())
app.use(body.urlencoded({ extended: true}))

app.use('/', publicRouter)
app.use('/api/login', loginRouter)
app.use('/api/yelp', yelpRouter)

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

const port = process.env.PORT || 4300;
app.listen(port);