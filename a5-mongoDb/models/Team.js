/**
 * Team.js -- a5-mongoDb
 * Connection to mongoose and mongoDb database remotely
 *
 * @author Jesse Hernandez
 * @see index.js
 * @see credentials.js
 * 
 */

const mongoose = require('mongoose');


// connection to remote database on mLab
let conn = mongoose.connection;
conn.on('error', Error.bind(console, 'connection error:'));

// define Team model in JSON key/value pairs
// values indicate the data type of each key
let mySchema = mongoose.Schema({
    club: { type: String, required: true },
    sport: String,
    pubdate: Date,
    image: String
});

module.exports = mongoose.model('Team', mySchema);