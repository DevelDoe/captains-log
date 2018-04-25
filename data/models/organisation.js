/* depandencies */
var mongoose = require('mongoose')

/* user */
var organisationSchema = new mongoose.Schema({
    name: String,
    description: String,
    location_id: String
})

module.exports = mongoose.model('Organisation', organisationSchema)
