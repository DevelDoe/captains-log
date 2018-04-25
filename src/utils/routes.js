import Home from '../components/Home/Home.vue'

import Resources from '../components/Resources/Resources.vue'
import ResourceDetails from '../components/Resources/ResourceDetails.vue'

import Locations from '../components/Locations/Locations.vue'
import MoonDetails from '../components/Locations/MoonDetails.vue'
import OutpostDetails from '../components/Locations/OutpostDetails.vue'
import StationDetails from '../components/Locations/StationDetails.vue'

import Missions from '../components/Missions/Missions.vue'
import MissionDetails from '../components/Missions/MissionDetails.vue'

import Characters from '../components/Characters/Characters.vue'
import CharacterDetails from '../components/Characters/CharacterDetails.vue'

import Organisations from '../components/Organisations/Organisations.vue'
import OrganisationDetails from '../components/Organisations/OrganisationDetails.vue'

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
        path: '/moon-details',
        component: MoonDetails,
        name: 'Moon'
    },{
        path: '/outpost-details',
        component: OutpostDetails,
        name: 'Outpost'
    },{
        path: '/station-details',
        component: StationDetails,
        name: 'Station'
    },{
        path: '/missions',
        component: Missions,
        name: 'missions'
    },{
        path: '/mission-details',
        component: MissionDetails,
        name: 'Mission'
    },{
        path: '/characters',
        component: Characters,
        name: 'characters'
    },{
        path: '/character-details',
        component: CharacterDetails,
        name: 'Character'
    },{
        path: '/organisations',
        component: Organisations,
        name: 'organisations'
    },{
        path: '/organisation-details',
        component: OrganisationDetails,
        name: 'Organisation'
    }
]
