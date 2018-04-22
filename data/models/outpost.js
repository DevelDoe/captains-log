/* depandencies */
var mongoose = require('mongoose')

/* user */
var outpostSchema = new mongoose.Schema({
    name: String,
    location_id: String,
    resources: Array
})

module.exports = mongoose.model('Outpost', outpostSchema)
