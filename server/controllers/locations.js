var Promise = require('bluebird');
var MongoClient = require('mongodb').MongoClient;
var config = require('./config');

module.exports = {
    
    find: (params) => {
        return Promise.resolve(config.locations.find(params).toArray());
    },
    
    findById: (id) => {
        return Promise.resolve(config.locations.find({id}).limit(1).toArray());
    },

    create: (params) => {
        return Promise.resolve(config.locations.insertOne(params));
    },

    update: (params) => {
        return Promise.resolve(config.locations.findOneAndUpdate({id: params.id},params));
    },

    delete: (id) => {
        return Promise.resolve(config.locations.findOneAndDelete({id}));
    }

}