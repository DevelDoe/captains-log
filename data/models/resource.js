/* depandencies */
var mongoose = require('mongoose')

/* user */
var resourceSchema = new mongoose.Schema({
    name: String
})

module.exports = mongoose.model('Resource', resourceSchema)
