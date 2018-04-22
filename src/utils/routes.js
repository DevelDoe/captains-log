import Home from '../components/Home/Home.vue'
import Resources from '../components/Resources/Resources.vue'
import ResourceDetails from '../components/Resources/ResourceDetails.vue'
import Locations from '../components/Locations/Locations.vue'
import LocationDetails from '../components/Locations/LocationDetails.vue'
import Outposts from '../components/Outposts/Outposts.vue'
import OutpostDetails from '../components/Outposts/OutpostDetails.vue'
import Missions from '../components/Missions/Missions.vue'
import MissionDetails from '../components/Missions/MissionDetails.vue'
import Characters from '../components/Characters/Characters.vue'
import CharacterDetails from '../components/Characters/CharacterDetails.vue'
import Entities from '../components/Entities/Entities.vue'
import EntityDetails from '../components/Entities/EntityDetails.vue'

export default [{
        path: '/',
        component: Home,
        name: 'home'
    },{
        path: '/resources',
        component: Resources,
        name: 'resources'
    },{
        path: '/resource-details',
        component: ResourceDetails,
        name: 'resource-details'
    },{
        path: '/locations',
        component: Locations,
        name: 'locations'
    },{
        path: '/location-details',
        component: LocationDetails,
        name: 'location-details'
    },{
        path: '/outposts',
        component: Outposts,
        name: 'outposts'
    },{
        path: '/outpost-details',
        component: OutpostDetails,
        name: 'outpost-details'
    },{
        path: '/missions',
        component: Missions,
        name: 'missions'
    },{
        path: '/mission-details',
        component: MissionDetails,
        name: 'mission-details'
    },{
        path: '/characters',
        component: Characters,
        name: 'characters'
    },{
        path: '/character-details',
        component: CharacterDetails,
        name: 'character-details'
    },{
        path: '/entities',
        component: Entities,
        name: 'entities'
    },{
        path: '/entity-details',
        component: EntityDetails,
        name: 'entity-details'
    }
]
