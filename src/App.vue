<!--
@Author: Andree Ray <andreeray>
@Date:   2018-01-18T21:23:04+01:00
@Email:  andreeray@live.com
@Filename: App.vue
@Last modified by:   andreeray
@Last modified time: 2018-01-18T21:25:30+01:00
-->

<template>
    <div id="app">

        <header>
          <h1>Captains Log</h1>
        </header>

        <nav>
          <ul class="group">
            <li><router-link :to="{ name: 'home', params: {} }">home</router-link></li>
            <li><router-link :to="{ name: 'resources', params: {} }">resources</router-link></li>
            <li><router-link :to="{ name: 'locations', params: {} }">locations</router-link></li>
            <li><router-link :to="{ name: 'missions', params: {} }">missions</router-link></li>
            <li><router-link :to="{ name: 'characters', params: {} }">characters</router-link></li>
            <li><router-link :to="{ name: 'entities', params: {} }">entities</router-link></li>
          </ul>
        </nav>

        <router-view
            :resources="resources"
            :locations="locations"
            :location_types="location_types"
            :missions="missions"
            :characters="characters"
            :entities="entities"
            :meta_data="meta_data"

        ></router-view>


        <DevelToast :response="response"/>

    </div>
</template>

<script>
import { bus } from './root'
export default {
    props: [
        'resources',
        'locations',
        'location_types',
        'missions',
        'response',
        'entities',
        'characters',
        'meta_data'
    ],
    data() {
        return {
            modal_header: 'Modal Header',
            modal_bread: 'Modal Bread',
            modal_footer: 'Modal footer'
        }
    },
    methods: {

        onSubmit() {
            const args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments))

            const collection = args.shift() || null
            const data       = args.shift() || null


            let body = {}
            Object.keys( data ).forEach( key => {
                body[key] = data[key]
            })

            this.$http.post(`${collection}/`, body)
                .then( res => {

                    if(res.body.model) {
                        bus.$emit('setResponse', res.body.model + ' saved')
                        body._id = res.body._id
                        this[collection].push(body)
                    }
                    else
                        bus.$emit('setResponse', res.body.message)
                    setTimeout( () => { bus.$emit('setResponse', '') }, 4000)
                })
                .catch( err => {
                    bus.$emit( 'setResponse', 'Connection error ' )
                    setTimeout( () => { bus.$emit('setResponse', '') }, 4000 )
                })
        },

        onUpdate() {
            const args       = (arguments.length === 1 ? [ arguments[0] ] : Array.apply( null, arguments ))

            const collection = args.shift() || null
            const data       = args.shift() || null
            const id         = args.shift() || null


            let body = {}
            Object.keys( data ).forEach( key => {
                body[key] = data[key]
            })

            this.$http.put( `${collection}/${id}`, body )
                .then( res => {
                    if(res.body.model)
                        bus.$emit('setResponse', res.body.model + ' updated')
                    else
                        bus.$emit('setResponse', res.body.message)
                    setTimeout( () => { bus.$emit( 'setResponse', '' ) }, 4000 )
                })
                .catch( err => {
                    bus.$emit( 'setResponse', 'Connection error' )
                    setTimeout( () => { bus.$emit('setResponse', '') }, 4000 )
                })
        },

        onDelete() {
            const args       = (arguments.length === 1 ? [ arguments[0] ] : Array.apply( null, arguments ))

            const collection = args.shift()
            const id         = args.shift()
            const index      = args.shift()

            this.$http.delete(`${collection}/${id}`)
                .then(res => {
                    this[collection].splice(index, 1)
                    bus.$emit('setResponse', res.body.model + ' deleted')
                    setTimeout( () => { bus.$emit('setResponse', '') }, 4000 )
                }).catch(function(error){
                    bus.$emit( 'setResponse', 'Connection error' )
                    setTimeout( () => { bus.$emit('setResponse', '') }, 4000 )
                })

            this.$router.push({ path: collection })
        }

    },
    created () {
        bus.$on('save', ( collection, data ) => {
            this.onSubmit( collection, data )
        })
        bus.$on('update',( collection, data, id ) => {
            this.onUpdate( collection, data, id )
        })
        bus.$on('delete',(collection, id, index) => {
            this.onDelete( collection, id, index )
        })
    },
    mounted () {
        console.log('on submit go to details')
    }
}
</script>
