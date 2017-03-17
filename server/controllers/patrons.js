var Promise = require('bluebird');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var config = require('./config');

module.exports = {
    
    find: (params) => {
        return Promise.resolve(config.patrons.find(params).toArray());
    },
    
    findById: (id) => {
        return Promise.resolve(config.patrons.find({_id: ObjectId(id)}).limit(1).toArray());
    },

    create: (params) => {
        return Promise.resolve(config.patrons.insertOne(params));
    },

    update: (params) => {
        var poll = params;
        poll._id = ObjectId(params._id);
        return Promise.resolve(config.patrons.findOneAndUpdate({_id: ObjectId(params._id)},poll));
    },

    delete: (id) => {
        return Promise.resolve(config.patrons.findOneAndDelete({_id: ObjectId(id)}));
    }

}