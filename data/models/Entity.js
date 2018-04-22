/* depandencies */
var mongoose = require('mongoose')

/* user */
var entitySchema = new mongoose.Schema({
    name: String,
})

module.exports = mongoose.model('Entity', entitySchema)
