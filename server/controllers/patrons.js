var Promise = require('bluebird');
var MongoClient = require('mongodb').MongoClient;
var config = require('./config');

module.exports = {
    
    find: (params) => {
        return Promise.resolve(config.patrons.find(params).toArray());
    },
    
    findById: (id) => {
        return Promise.resolve(config.patrons.find({id}).limit(1).toArray());
    },

    create: (params) => {
        return Promise.resolve(config.patrons.insertOne(params));
    },

    update: (params) => {
        var patron = params;
        return Promise.resolve(config.patrons.findOneAndUpdate({id: patron.id},patron,{upsert:true}));
    },

    delete: (id) => {
        return Promise.resolve(config.patrons.findOneAndDelete({id}));
    }

}