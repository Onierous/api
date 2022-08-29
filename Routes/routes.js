'use strict'; //Keeps types from mixing

module.exports = function (app) {

    var ticket = require('../controllers/Controller')

    app.route('/reciept')
        .get(reciept.listReceipts)
        .post(ticket.newReceipt)
        .put(ticket.updateReceipt)
        .delete(ticket.deleteReceipt);

};