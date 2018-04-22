/**
 * @Author: andreeray
 * @Date:   2017-12-30T19:50:17+01:00
 * @Email:  andreeray@live.com
 * @Filename: server.js
 * @Last modified by:   andreeray
 * @Last modified time: 2018-01-02T08:13:41+01:00
 */

/* DEPENDENCIES */
var fs          = require('fs')
var rfs         = require('rotating-file-stream')
var path        = require('path')
var express     = require('express')
var app         = express()
var bodyParser  = require('body-parser')
var mongoose    = require('mongoose')
var cors        = require('cors')
var morgan      = require('morgan')
var Resource    = require('./data/models/resource')
var Location    = require('./data/models/location')
var Outpost     = require('./data/models/outpost')
var Mission     = require('./data/models/mission')
var Character   = require('./data/models/character')
var Entity      = require('./data/models/entity')

// ################# SETUP ####################
var port = process.env.PORT || 4000

/* LOG */
var logDirectory = path.join(__dirname, 'data/logging')
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
var accessLogStream = rfs('access.log', {
  interval: '3d', // rotate daily
  path: logDirectory
})
app.use(morgan('combined', {
    stream: accessLogStream
}))

mongoose.connect('mongodb://localhost:27017/starcitizen')

/* MIDDLEWARE */
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.use(morgan('dev'))


/* ROUTING */
var router = express.Router()

router.get('/', function (req,res){
 res.json({message: 'starcitizen backend'})
})

// ################# RESOURCES ####################
router.route('/resources')
    .post(function(req, res) {

        var resource  = new Resource()
        resource.name = req.body.name

        resource.save(function(err) {
            if (err) {
                error(res, err)
                return
            }
            res.json({ model: 'resource', _id: resource._id })
        })
    })
    .get(function(req, res) {
        Resource.find(function(err, resources) {
            if (err) {
                error(res, err)
                return
            }
           res.json(resources)
        })
    })
router.route('/resources/:resource_id')
    .get(function (req, res) {
        Resource.findById(req.params.resource_id, function (err, resource) {
            if (err) {
                error(res, err)
                return
            }
            res.json(resource)
        })
    })
    .put(function (req, res) {
        console.log(req.params)
        Resource.findById(req.params.resource_id, function (err, resource) {

            if (err) {
                error(res, err)
                return
            }

            resource.name = req.body.name

            resource.save(function (err) {
                if (err) {
                    error(res, err)
                    return
                }
                res.json({ model: 'resource' })
            })
        })
    })
    .delete(function (req, res) {
        Resource.remove({
            _id: req.params.resource_id
        }, function (err, resource) {
            if (err) {
                error(res, err)
                return
            }
            res.json({ model: 'resource' })
        })
    })
// ################# locations ####################
router.route('/locations')
    .post(function(req, res) {
        var location = new Location()

        location.name = req.body.name
        location.type = req.body.type

        location.save(function(err) {
            if (err) {
                error(res, err)
                return
            }
            res.json({ model: 'location', _id: location._id })
        })
    })
    .get(function(req, res) {
        Location.find(function(err, locations) {
            if (err) {
                error(res, err)
                return
            }
           res.json(locations)
        })
    })
router.route('/locations/:location_id')
    .get(function (req, res) {
        Location.findById(req.params.location_id, function (err, location) {
            if (err) {
                error(res, err)
                return
            }
            res.json(location)
        })
    })
    .put(function (req, res) {
        Location.findById(req.params.location_id, function (err, location) {
            if (err) {
                error(res, err)
                return
            }

            location.name = req.body.name
            location.type = req.body.type

            location.save(function (err) {
                if (err) {
                    error(res, err)
                    return
                }
                res.json({ model: 'location' })
            })
        })
    })
    .delete(function (req, res) {
        Location.remove({
            _id: req.params.location_id
        }, function (err, location) {
            if (err) {
                error(res, err)
                return
            }
            res.json({ model: 'location' })
        })
    })
 // ################# outposts ####################
 router.route('/outposts')
    .post(function(req, res) {
       var outpost = new Outpost()

       outpost.name = req.body.name
       outpost.location_id = req.body.location_id
       outpost.resources = req.body.resources

       outpost.save(function(err) {
           if (err) {
               error(res, err)
               return
           }
           res.json({ model: 'outpost', _id: outpost._id })
       })

    })
    .get(function(req, res) {
        Outpost.find(function(err, outposts) {
            if (err) {
                error(res, err)
                return
            }
           res.json(outposts)
        })
    })
router.route('/outposts/:outpost_id')
    .get(function (req, res) {
        Outpost.findById(req.params.outpost_id, function (err, outpost) {
            if (err) {
                error(res, err)
                return
            }
            res.json(outpost)
        })
    })
    .put(function (req, res) {
        Outpost.findById(req.params.outpost_id, function (err, outpost) {
            if (err) {
                error(res, err)
                return
            }

            outpost.name = req.body.name
            outpost.location_id = req.body.location_id
            outpost.resources = req.body.resources

            outpost.save(function (err) {
                if (err) {
                    error(res, err)
                    return
                }
                res.json({ model: 'outpost' })
            })
        })
    })
    .delete(function (req, res) {
        Outpost.remove({
            _id: req.params.outpost_id
        }, function (err, outpost) {
            if (err) {
                error(res, err)
                return
            }
            res.json({ model: 'outpost' })
        })
    })
// ################# MISSIONS ####################
router.route('/missions')
    .post(function(req, res) {
       var mission = new Mission()

       mission.name        = req.body.name
       mission.type        = req.body.type
       mission.description = req.body.description
       mission.payment     = req.body.payment
       mission.giver_id    = req.body.giver_id
       mission.objectives  = req.body.objectives

       mission.save(function(err) {
           if (err) {
               error(res, err)
               return
           }
            res.json({ model: 'mission', _id: mission._id })
       })

    })
    .get(function(req, res) {
        Mission.find(function(err, missions) {
            if (err) {
                error(res, err)
                return
            }
            res.json(missions)
        })
    })
router.route('/missions/:missions_id')
    .get(function (req, res) {
        Mission.findById(req.params.missions_id, function (err, mission) {
            if (err) {
                error(res, err)
                return
            }
            res.json(mission)
        })
    })
    .put(function (req, res) {
        Mission.findById(req.params.missions_id, function (err, mission) {
            if (err) {
                error(res, err)
                return
            }

            mission.name        = req.body.name
            mission.type        = req.body.type
            mission.description = req.body.description
            mission.payment     = req.body.payment
            mission.giver_id   = req.body.giver_id
            mission.objectives  = req.body.objectives

            mission.save(function (err) {
                if (err) {
                    error(res, err)
                    return
                }
                res.json({ model: 'mission' })
            })
        })
    })
    .delete(function (req, res) {
        Mission.remove({
           _id: req.params.missions_id
        }, function (err, mission) {
            if (err) {
                error(res, err)
                return
            }
            res.json({ model: 'mission' })
        })
    })
// ################# CHARACTERS ####################
router.route('/characters')
    .post(function(req, res) {
       var character = new Character()
       character.name     = req.body.name
       character.location_id = req.body.location_id

       character.save(function(err) {
           if (err) {
               error(res, err)
               return
           }
           res.json({ model: 'character', _id: character._id })
       })

    })
    .get(function(req, res) {
        Character.find(function(err, characters) {
            if (err) {
                error(res, err)
                return
            }
            res.json(characters)
        })
    })
router.route('/characters/:character_id')
    .get(function (req, res) {
        Character.findById(req.params.character_id, function (err, character) {
            if (err) {
                error(res, err)
                return
            }
            res.json(character)
        })
    })
    .put(function (req, res) {
        Character.findById(req.params.character_id, function (err, character) {
            if (err) {
                error(res, err)
                return
            }

            character.name = req.body.name

            character.save(function (err) {
                if (err) {
                    error(res, err)
                    return
                }
               res.json({ model: 'character' })
            })
        })
    })
    .delete(function (req, res) {
        Character.remove({
           _id: req.params.character_id
        }, function (err, character) {
           if (err) {
               error(res, err)
               return
           }
           res.json({ model: 'character' })
        })
    })
// ################# ENTITIES ####################
router.route('/entities')
    .post(function(req, res) {
        var entity = new Entity()
        entity.name     = req.body.name

        entity.save(function(err) {
            if (err) {
                error(res, err)
                return
            }
            res.json({ model: 'entity', _id: entity._id })
        })
    })
.get(function(req, res) {
    Entity.find(function(err, entities) {
        if (err) {
            error(res, err)
            return
        }
        res.json(entities)
    })
})
router.route('/entities/:entity_id')
.get(function (req, res) {
    Entit.findById(req.params.entity_id, function (err, entity) {
        if (err) {
            error(res, err)
            return
        }
        res.json(entity)
    })
})
.put(function (req, res) {
    Entity.findById(req.params.entity_id, function (err, entity) {
        if (err) {
            error(res, err)
            return
        }

        entity.name = req.body.name

        entity.save(function (err) {
            if (err) {
                error(res, err)
                return
            }
           res.json({ model: 'entity' })
        })
    })
})
.delete(function (req, res) {
    Entity.remove({
       _id: req.params.entity_id
    }, function (err, entity) {
       if (err) {
           error(res, err)
           return
       }
       res.json({ model: 'entity' })
    })
})

function error (res, err)  {
    res.json({ message: 'Server error:' + err })
}

app.use('/', router)
app.listen(port)
console.log('Server upp on port', port)
