export default {
    validation_rules: {
        resource: {
            name: {
                type: 'String',
                required: true
            }
        },
        location: {
            name: {
                type: 'String',
                required: true
            },
            type: {
                type: 'String',
                required: true
            },
            location_id: {
                type: 'String',
                required: false
            },
            resources: {
                resource_id: {
                    type: 'String',
                    required: true
                },
                sell: {
                    type: 'Number',
                    required: false
                },
                buy: {
                    type: 'Number',
                    required: false
                }
            }
        },
        mission: {
            name: {
                type: 'String',
                required: true
            },
            type: {
                type: 'String',
                required: true
            },
            description: {
                type: 'String',
                required: true
            },
            payment: {
                type: 'Number',
                required: true
            },
            giver_id: {
                type: 'String',
                required: true
            },
            objectives: {
                description: {
                    type: 'String',
                    required: true
                }
            }
        },
        character: {
            name: {
                type: 'String',
                required: true
            },
            description: {
                type: 'String',
                required: false
            },
            location_id: {
                type: 'String',
                required: false
            }
        },
        organisation: {
            name: {
                type: 'String',
                required: true
            },
            description: {
                type: 'String',
                required: false
            },
            location_id: {
                type: 'String',
                required: false
            }
        }
    },
    location_filters: [
        'Moon',
        'Station',
        'Outpost'
    ]
}
