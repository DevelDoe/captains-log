/* depandencies */
var mongoose = require('mongoose')

/* user */
var characterSchema = new mongoose.Schema({
    name: String,
    description: String,
    location_id: String
})

module.exports = mongoose.model('Character', characterSchema)
