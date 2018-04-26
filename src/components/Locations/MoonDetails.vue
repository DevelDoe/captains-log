<template>
    <div id="locations-location-details" v-if="location">
        <DevelModal modal="updateLocation">
            <div slot="header"> <h2>Update Location</h2> </div>
            <div slot="bread">
                <form id="modal-form">
                    <input type="text" v-model="location.name" placeholder="Name">
                    type:
                    <select v-model="location.type">
                        <option v-for='location in filteredUpdateLocationTypes' :value="location" >{{ location }}</option>
                    </select>
                </form>
            </div>
            <div slot="footer">
                <div class="form-control">
                    <button @click="update('updateLocation')">save</button>
                </div>
            </div>
        </DevelModal>
        <DevelModal modal="addLocation">
            <div slot="header"> <h2>Add Location</h2> </div>
            <div slot="bread">
                <form id="modal-form">
                    <input type="text" v-model="input.location_name" placeholder="Name">
                    type:
                    <select v-model="input.location_type">
                        <option v-for='location in filteredLocationTypes' :value="location" >{{ location }}</option>
                    </select>
                </form>
            </div>
            <div slot="footer">
                <div class="form-control">
                    <button @click="addLocation('addLocation')">save</button>
                </div>
            </div>
        </DevelModal>

        <div class="backBtn">
            <div class="backBtn"><button @click="$router.go(-1)">go back</button></div>
        </div>
        <header>
            <h2>{{ location.name }}</h2>
            <h4>{{ location.type }}</h4>
        </header>
        <div class="main">
            <h5>Locations</h5>
            <div v-if="locationLocations">
                <LocationsLocation v-for="( o, i ) in locationLocations" :key="i" :location="o" :index="i" :type="o.type" />
            </div>

        </div>
        <footer>
            <div class="app-controls">
                <button @click="openModal('updateLocation')">update</button>
                <button @click="openModal('addLocation')">add location</button>
                <button @click="del()">delete</button>
            </div>
        </footer>

    </div>
</template>

<script>
import LocationsLocation from './LocationsLocation.vue'
export default {
    props: [ 'locations', 'meta_data', 'location_types'],
    data () {
        return {
            location_id: this.$route.query.location_id,
            location_index: this.$route.query.location_index,
            input: {
                location_name: '',
                location_type: ''
            }
        }
    },
    computed: {
        locationLocations() { return this.locations.filter( l => l.location_id === this.location_id ) || null },
        filteredLocationTypes () { return this.location_types.filter( t => t.toLowerCase() !== "moon")},
        filteredUpdateLocationTypes () { return this.location_types.filter( t => t.toLowerCase() === "moon")},
        location () { return this.locations.find(l => l._id === this.location_id ) || null }
    },
    methods: {
        openModal( modal ) {
            this.$bus.$emit('toggleModal', modal )
        },
        update( modal ) {
            const valid = this.mixinsValidate(  this.meta_data.validation_rules.location, this.location, 'locations', this.location_index)
            if ( valid === 'true' ) this.apiUpdate( 'locations', this.location, this.location_id, modal )
        },
        addLocation ( modal ) {
            const location = {
                name: this.input.location_name,
                type: this.input.location_type,
                location_id: this.location_id
            }
            const valid = this.mixinsValidate( this.meta_data.validation_rules.location, location, 'locations')
            if( valid === 'true' ) {
                this.locationLocations.push(location)
                this.apiSave( 'locations', location, modal)
                this.input.location_name = ''
                this.input.location_type = ''
            }
        },
        del() {
            this.apiDelete( 'locations', this.location_id, this.location_index )
        }
    },
    components: { LocationsLocation }
}
</script>
