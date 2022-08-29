var express = require('express'),
    app = express(),
    port = process.env.PORT || 8765; //"process.env.PORT" tells the program that if the depolyment server requires a specific port, use that else use the specified one.

//morgan is a middleware for logging requests to your servers console
var morgan = require('morgan');
app.use(morgan('dev'));

//Not quite sure what body-parser does, but I imagine from the name it's a good thing to have
var bodyParser = require('body-parser');
app.use(bodyParser.json());

//Setting CORS stuff, don't think I need this yet but whatevs
var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Credentials", "true");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE, OPTIONS, HEAD');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, token, _id");
    if (req.method === "OPTIONS")
        res.send(200);
    else
        next();
}
app.use(allowCrossDomain);

const dbConfig = require('./dbconfig.js');

//Mongoose is a middleware handler for talking to MongoDB
var mongoose = require('mongoose'),
    Task = require('./models/Model'),
    receipt = mongoose.model('receipt');

mongoose.set('useUnifiedTopology', true);

mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true }, function (err) {
    if (err) {
        console.log('Not connected to the database; ' + err)
    } else {
        console.log('Successfully connected to database!')
    }
});

var routes = require('./routes/Routes'); //importing route file
routes(app); //this line passes the instance of Express into the routes file so the file can use it locally to define database operations on each route

app.use(function (req, res) {
    res.status(404).send({
        url: req.originalUrl + ' not found'
    });
});

//logs to the console when the server is running
app.listen(port, function () {
    console.log('App running on port: ' + port);
});