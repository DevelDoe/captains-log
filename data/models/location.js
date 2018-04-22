/* depandencies */
var mongoose = require('mongoose')

/* user */
var locationSchema = new mongoose.Schema({
    name: String,
    type: String,
    location_id: String,
    resources: Array
})

module.exports = mongoose.model('Location', locationSchema)
