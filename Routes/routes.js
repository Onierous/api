'use strict'; //Keeps types from mixing

module.exports = function (app) {

    var reciept = require('../Controllers/controller')

    app.route('/reciept')
        .get(reciept.listReceipts)
        .post(reciept.newReceipt)
        .put(reciept.updateReceipt)
        .delete(reciept.deleteReceipt);

};