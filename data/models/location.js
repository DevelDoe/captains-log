/* depandencies */
var mongoose = require('mongoose')

/* user */
var locationSchema = new mongoose.Schema({
    name: String,
    type: String
})

module.exports = mongoose.model('Location', locationSchema)
