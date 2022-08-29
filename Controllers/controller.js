'use strict'; //Keeps types from mixing

var mongoose = require('mongoose');

const receipt = mongoose.model('receipt'); //creates a mongoose instance of the specified collection that's based on the model in the Model.js file

//create
exports.newReceipt = function (request, response) {

    var newReceipt = new receipt(request.body); //Creates an instance of the Mongoose receiptSchema type using the request body

    newReceipt.save(function (err, task) { //Performs the Mongoose document instance save function while passing in a function 
        if (err) //The function checks for an error
            response.send(err); //If there is an error it sends it back
        response.json(task); //If there isn't an error it returns the document as JSON?
    });

};

//read
exports.listReceipts = function (request, response) {

    console.log(Object.keys(request.query));

    //this part of the code is for a generic find with nothing specified. It returns all receipts
    if (Object.keys(request.query).length === 0 && request.query.constructor === Object) {

        receipt.find() //accesses the DB using this instance of the receipt schema
            .then(function (dbResponse) { //waits for data or an error
                response.send(dbResponse) //sends the data or error back to the caller
            });

    } else {

        receipt.find({ _id: request.query})
            .then(function (dbResponse) {
                response.send(dbResponse);
            });
    }
};

//update
exports.updateReceipt = function (request, response) {

    console.log(request.query);

    var query = request.query;

    receipt.findOneAndUpdate({_id: query}, request.body, {new: true})
        .then(function (dbResponse) { //waits for data or an error
            response.send(dbResponse) //sends the data or error back to the caller
        });

};

//delete
exports.deleteReceipt = function (request, response) {

    receipt.remove(request.query)
        .then(function (dbResponse) { //waits for data or an error
            response.send(dbResponse) //sends the data or error back to the caller
        });

};