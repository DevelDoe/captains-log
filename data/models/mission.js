/* depandencies */
var mongoose = require('mongoose')

/* user */
var missionSchema = new mongoose.Schema({
    name: String,
    type: String,
    description: String,
    payment: Number,
    giver_id: String,
    objectives: Array
})

module.exports = mongoose.model('Mission', missionSchema)
