var express = require('express');
var jwt = require('jsonwebtoken');
var config = require('../config');
var yelp = require('yelp-fusion');
var patrons = require('../controllers/patrons')
require('dotenv').config()

let token = undefined;

const yelpRouter = express.Router();
module.exports = yelpRouter;

yelpRouter.get('/', (req, res) => {
    if(req.user){
        patrons.update({id: req.user.id, term: req.query.term, zipcode: req.query.zipcode});
    }
    
    token ? yelpSearch(req.query.term, req.query.zipcode, res) : yelpAuth(req, res) 
});

function yelpAuth(req, res) {
    yelp.accessToken(process.env.YELP_ID, process.env.YELP_SECRET)
        .then(response => {
            token = response.jsonBody.access_token
            yelpSearch(req.query.term, req.query.zipcode, res)
        } )
        .catch(error => console.log(error))
}

function yelpSearch(term, zipcode, res) {
    let client = yelp.client(token);

    client.search({term, location: zipcode})
            .then( data => {
                res.status(200).json(data.jsonBody);
            })
            .catch(error => {
                res.status(500).send(error)
            })
}
