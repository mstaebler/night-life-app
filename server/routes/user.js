var userRouter = require('express').Router();
var locations = require('../controllers/locations');
require('dotenv').config();

module.exports = userRouter;

userRouter.get('/bar/:yelp_id/users', (req, res, next) => {
    if(req.user)
        return locations.update({ 
            id: req.params.yelp_id, 
            going: req.user.id
        }).then(doc => res.json(doc));
    else 
        return res.status(401).json({error:'please log in'})
})

userRouter.post('/users/:user_id/:yelp_id', (req, res, next) => {

})

userRouter.delete('/users/:user_id/:yelp_id', (req, res, next) => {

})