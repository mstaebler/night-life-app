var userRouter = require('express').Router();
var locations = require('../controllers/locations');
require('dotenv').config();

module.exports = userRouter;

userRouter.get('/bar/:yelp_id/users', (req, res, next) => {
    console.log(req.user)
    // When a user clicks a button to indicate they are going it reaches this endpoint
    // When clicked this location now replaces the previous user location. If the location is already selected it should delete the entry entirely. 
    return locations.find({id: req.params.yelp_id}).then(doc => res.json(doc));
})

userRouter.post('/users', (req, res, next) => {
    console.log(req.body, req.user);
    return res.json(req.body);
    // return locations.update({ 
    //         id: req.body.id, 
    //         going: req.user.id
    //     }).then(doc => res.json(doc));
})

userRouter.delete('/users/:user_id/:yelp_id', (req, res, next) => {
    return locations.delete({id: req.params.yelp_id, going: req.params.user_id}).then(doc => res.json(doc));
})