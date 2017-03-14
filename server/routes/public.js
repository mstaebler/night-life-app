var express = require('express');

const publicRouter = express.Router();
module.exports = publicRouter;

publicRouter.get('/', (request, response) => {
  request.sendFile(__dirname + '/src/app/index.html');
});