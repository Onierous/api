'use strict'; //Keeps types from mixing

var mongoose = require('mongoose'); //calls mongoose for interaction with DB stuff

var Schema = mongoose.Schema;

var receiptSchema = new Schema({

    store: { type: String },
    item: [{ 
        name: { type: String },
        price: { type: String }
    }]
    
});
module.exports = mongoose.model('receipt', receiptSchema);