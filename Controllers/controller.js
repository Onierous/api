'use strict'; //Keeps types from mixing

var mongoose = require('mongoose');

const receipt = mongoose.model('receipt'); //creates a mongoose instance of the specified collection that's based on the model in the Model.js file

//create
exports.newReceipt = function (request, response) {

    var newTicket = new ticket(request.body); //Creates an instance of the Mongoose ticketSchema type using the request body

    newTicket.save(function (err, task) { //Performs the Mongoose document instance save function while passing in a function 
        if (err) //The function checks for an error
            response.send(err); //If there is an error it sends it back
        response.json(task); //If there isn't an error it returns the document as JSON?
    });

};

//read
exports.listReceipts = function (request, response) {

    console.log(Object.keys(request.query));

    //this part of the code is for a generic find with nothing specified. It returns all tickets
    if (Object.keys(request.query).length === 0 && request.query.constructor === Object) {

        ticket.find() //accesses the DB using this instance of the ticket schema
            .then(function (dbResponse) { //waits for data or an error
                response.send(dbResponse) //sends the data or error back to the caller
            });

    } else {

        ticket.find({ _id: request.query})
            .then(function (dbResponse) {
                response.send(dbResponse);
            });
    }
};

//update
exports.updateReceipt = function (request, response) {

    console.log(request.query);
    
    var query = request.query;

    ticket.findOneAndUpdate({_id: query}, request.body, {new: true})
        .then(function (dbResponse) { //waits for data or an error
            response.send(dbResponse) //sends the data or error back to the caller
        });

};

//delete
exports.deleteTicket = function (request, response) {

    ticket.remove(request.query)
        .then(function (dbResponse) { //waits for data or an error
            response.send(dbResponse) //sends the data or error back to the caller
        });

};