const mongoose = require('mongoose');
// const MongoClient = require('mongodb').MongoClient;

// Connect to mongodb Database using mongoose
const db = mongoose.connect(process.env.DB_URI + '/' + process.env.DB_NAME, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
    // .then(resp => {
    //     // console.log(resp);
    //     // console.log('MongoDB Connected: ' + process.env.DB_URI);
    // })
    // .catch(err => {
    //     console.log(err);
    // })

// Connect mongoDB using MongoClient
// MongoClient.connect(process.env.DB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }, (err, client) => {
//     if (err) {
//         return console.log(err);
//     }
//
//     // Specify database you want to access
//     const db = client.db(process.env.DB_NAME);
//
//     console.log(`MongoDB Connected: ` + process.env.DB_URI);
// })

module.exports = {
    db,
    mongoose
};