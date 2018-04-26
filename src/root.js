import Vue from 'vue'
import App from './App.vue'
import '../node_modules/devel-style/devel-style.css'
import './assets/css/app.css'
import './assets/css/transitions.css'

import VueRouter from 'vue-router'
Vue.use(VueRouter)
import routes from './utils/routes'
const router = new VueRouter({
    routes
})

import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.root = 'http://localhost:4000'
// Vue.http.options.root = 'http://35.189.243.23:4000'

import Plugins from './utils/plugins.js'
Vue.use(Plugins)

import helperFunctions from './utils/helperFunctions.js'
Vue.use(helperFunctions)

import api from './utils/api.js'
Vue.use(api)

import { bigNumber } from 'bignumber.js'
Object.defineProperty(Vue.prototype, '$bigNumber', { get() { return this.$root.bigNumber } } )

const bus = new Vue()
Object.defineProperty(Vue.prototype, '$bus', { get() { return this.$root.bus } })

const markdown = require('markdown-it')()
Object.defineProperty(Vue.prototype, '$markdown', { get() { return this.$root.markdown } } )

const root = new Vue({
    el: '#app',
    data () {
        let data = {
            resources: [],
            locations: [],
            location_types: [
                'Sytem',
                'Star',
                'Planet',
                'Station',
                'Moon',
                'Outpost'
            ],
            missions: [],
            characters: [],
            organisations: [],
            response: '',
            meta_data: {},
            bus,
            markdown
        }
        return data
    },
    render (h) {
        return h(App, { props: this.$data })
    },
    router,
    created() {
        bus.$on('setResponse', response => {
            this.response = response
        })
        this.$http.get('resources/').then(res => { this.resources = res.data })
        this.$http.get('locations/').then(res => { this.locations = res.data })
        this.$http.get('characters/').then(res => { this.characters = res.data })
        this.$http.get('missions/').then(res => { this.missions = res.data })
        this.$http.get('organisations/').then(res => { this.organisations = res.data })
    },
    mounted () { console.log('Check for duplicate names;filter search field') }
})

import metaData from './data/meta.js'
root.meta_data = metaData
