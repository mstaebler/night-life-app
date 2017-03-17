var Promise = require('bluebird');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var config = require('./config');

module.exports = {
    
    find: (params) => {
        return Promise.resolve(config.polls.find(params).toArray());
    },
    
    findById: (id) => {
        return Promise.resolve(config.polls.find({_id: ObjectId(id)}).limit(1).toArray());
    },

    create: (params) => {
        return Promise.resolve(config.polls.insertOne(params));
    },

    update: (params) => {
        var poll = params;
        poll._id = ObjectId(params._id);
        return Promise.resolve(config.polls.findOneAndUpdate({_id: ObjectId(params._id)},poll));
    },

    delete: (id) => {
        return Promise.resolve(config.polls.findOneAndDelete({_id: ObjectId(id)}));
    }

}