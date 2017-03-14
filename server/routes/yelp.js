var express = require('express');
var jwt = require('jsonwebtoken');
var config = require('../config');

const yelpRouter = express.Router();
module.exports = yelpRouter;

yelpRouter.use((request, response, next) => {
    const token = request.headers.authorization;

    verify(token, config.secret, function(tokenError) {
        if (tokenError) {
            return response.status(403).json({
                message: 'Invalid token, please Log in first'
            });
        }

        next();
    });
});

yelpRouter.get('/', (request, response) => {
    response.json({
        text: 'Greetings, you have valid token.',
        title: 'Protected call'
    });
});


