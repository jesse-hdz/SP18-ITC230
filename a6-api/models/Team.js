/**
 * Team.js -- a6-api
 * Connection to mongoose and mongoDb database remotely
 *
 * @author Jesse Hernandez
 * @see index.js
 * @see credentials.js
 * 
 */

const mongoose = require('mongoose'),
    connDB = require('../config.js');


// connection to remote database on mLab
mongoose.connect(connDB);

let conn = mongoose.connection;
conn.on('error', Error.bind(console, 'connection error:'));

// define Team model in JSON key/value pairs
// values indicate the data type of each key
let mySchema = mongoose.Schema({
    club: { type: String, required: true },
    sport: String,
    pubdate: Date,
    image: String,
    approved: Boolean
});

module.exports = mongoose.model('teams', mySchema);
