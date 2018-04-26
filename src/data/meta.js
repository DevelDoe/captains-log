export default {
    validation_rules: {
        resource: {
            name: {
                type: 'String',
                required: true,
                unique: true
            }
        },
        location: {
            name: {
                type: 'String',
                required: true,
                unique: true
            },
            type: {
                type: 'String',
                required: true,
                unique: false
            },
            location_id: {
                type: 'String',
                required: false,
                unique: false
            },
            resources: {
                resource_id: {
                    type: 'String',
                    required: true,
                    unique: false
                },
                sell: {
                    type: 'Number',
                    required: false,
                    unique: false
                },
                buy: {
                    type: 'Number',
                    required: false,
                    unique: false
                }
            }
        },
        mission: {
            name: {
                type: 'String',
                required: true,
                unique: true
            },
            type: {
                type: 'String',
                required: true,
                unique: false
            },
            description: {
                type: 'String',
                required: true,
                unique: false
            },
            payment: {
                type: 'Number',
                required: true,
                unique: false
            },
            giver_id: {
                type: 'String',
                required: true,
                unique: false
            },
            objectives: {
                description: {
                    type: 'String',
                    required: true,
                    unique: false
                }
            }
        },
        character: {
            name: {
                type: 'String',
                required: true,
                unique: true
            },
            description: {
                type: 'String',
                required: false,
                unique: false
            },
            location_id: {
                type: 'String',
                required: false,
                unique: false
            }
        },
        organisation: {
            name: {
                type: 'String',
                required: true,
                unique: true
            },
            description: {
                type: 'String',
                required: false,
                unique: false
            },
            location_id: {
                type: 'String',
                required: false,
                unique: false
            }
        }
    },
    location_filters: [
        'Moon',
        'Station',
        'Outpost'
    ]
}
