const mongoose = require('mongoose'); //Import Mongoose

mongoose.connect('mongodb://127.0.0.1:27017/socialNetworkDB'); //Wrap Mongoose around local connection to MongoDB

module.exports = mongoose.connection; //Export connection