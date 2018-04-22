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
            }
        },
        outpost: {
            name: {
                type: 'String',
                required: true
            },
            location: {
                type: 'String',
                required: true
            },
            resources: {
                resource: {
                    type: 'String',
                    required: true
                },
                price: {
                    type: 'Number',
                    required: true
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
            giver: {
                type: 'String',
                required: true
            },
            objectives: {
                type: 'Array',
                required: true
            }
        }
    }
}
