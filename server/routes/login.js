var express = require('express');
var passport = require('passport');

const loginRouter = express.Router();
module.exports = loginRouter;


loginRouter.get('/twitter/callback', passport.authenticate('twitter', { successRedirect: '/',
                                     failureRedirect: '/' }))
loginRouter.get('/auth/twitter', passport.authenticate('twitter'));

loginRouter.get('/auth/check', (req, res, next) => {
    console.log('req.user:',req.user)
    req.user ? res.json({loggedin: true}) : res.json({loggedin: false})
})