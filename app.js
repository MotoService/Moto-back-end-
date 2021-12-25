const express = require('express');
const app = express();
const productRouter = require('./route/products');
var bodyParser = require('body-parser');
const cors =require('cors');

const mongoose = require('mongoose');
mongoose.connect('mongodb://saleem:saleem@cluster0-shard-00-00.2eyba.mongodb.net:27017,cluster0-shard-00-01.2eyba.mongodb.net:27017,cluster0-shard-00-02.2eyba.mongodb.net:27017/saleem?ssl=true&replicaSet=atlas-dsc4ak-shard-0&authSource=admin&retryWrites=true&w=majority',
{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.on('connected', ()=>{console.log("conected with cloud")});
connection.on('error', ()=>{console.log("error with database")});

app.use([bodyParser.urlencoded({extended:true }), express.json(),express.urlencoded({extended:true})]);
app.use(cors());

app.use('/products', productRouter);

var port = process.env.PORT || 8080 ;
app.listen(port, () => {
    console.log("its working");
})
module.exports = app;
