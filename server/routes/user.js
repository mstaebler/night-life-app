var userRouter = require('express').Router();
var locations = require('../controllers/locations');
require('dotenv').config();

module.exports = userRouter;

userRouter.get('/bar/:yelp_id/users', (req, res, next) => {  
    return locations.find({id: req.params.yelp_id}).then(doc => res.json(doc));
})

userRouter.post('/users/:yelp_id', (req, res, next) => {
    return locations.update({ 
            id: req.params.yelp_id, 
            going: req.user.id
        }).then(doc => res.json(doc));
})

userRouter.delete('/users/:user_id/:yelp_id', (req, res, next) => {
    return locations.delete({id: req.params.yelp_id, going: req.params.user_id}).then(doc => res.json(doc));
})