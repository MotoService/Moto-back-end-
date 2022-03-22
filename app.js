// declare express module 
const express = require('express');
const app = express();

//import route
const MotoristServiceRouter = require('./route/MotoristService');

//import bodyParser to process data sent through an HTTP request body
var bodyParser = require('body-parser');
const cors = require('cors');

// database connection
const db = require('mongoose');
db.connect('mongodb://abdallah:abdallah@cluster0-shard-00-00.0l0ge.mongodb.net:27017,cluster0-shard-00-01.0l0ge.mongodb.net:27017,cluster0-shard-00-02.0l0ge.mongodb.net:27017/motoristService?ssl=true&replicaSet=atlas-yg3dvr-shard-0&authSource=admin&retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
const connection = db.connection;
connection.on('connected', () => { console.log("conected with cloud") });
connection.on('error', () => { console.log("error with database") });
/////////////////////////////////////////////////////////////////////////

app.use([bodyParser.urlencoded({ extended: true }), express.json(), express.urlencoded({ extended: true })]);
app.use(cors());

//route middlewares
app.use('/motoristService', MotoristServiceRouter);

//port and api assignment
var port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log("Server Up and running");
})
module.exports = app;
