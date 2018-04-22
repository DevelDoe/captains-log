/* depandencies */
var mongoose = require('mongoose')

/* user */
var characterSchema = new mongoose.Schema({
    name: String,
    location: String
})

module.exports = mongoose.model('Character', characterSchema)
