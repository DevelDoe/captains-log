<template>
    <div id="locations">
        <DevelModal modal="addLocation">
            <div slot="header"> <h2>Add Location</h2> </div>
            <div slot="bread">
                <form id="modal-form">
                    <input type="text" v-model="inputs.location_name" placeholder="Name">
                    type:
                    <select v-model="inputs.location_type">
                        <option v-for='location in location_types' :value="location" >{{ location }}</option>
                    </select>
                    location:
                    <select v-model="inputs.location_id">
                        <option v-for='location in locations' :value="location._id" >{{ location.name }}</option>
                    </select>
                </form>
            </div>
            <div slot="footer">
                <div class="form-control">
                    <button type="button" @click="save('addLocation')">save</button>
                </div>
            </div>
        </DevelModal>
        <header> <h2>Locations</h2> </header>
        <section class="main group">
            <div class="locations">
                <LocationsLocation v-for='( o, i) in fltLoc' :key="i"
                    :location="o"
                    :index="i"
                    :type="o.type"
                />
            </div>
            <FltrLocation :meta_data='meta_data' :filterLocations="filterLocations" />
        </section>
        <footer>
            <div class="form-control">
                <button @click="openModal('addLocation')">add new location</button>
            </div>
        </footer>

    </div>
</template>

<script>
import LocationsLocation from './LocationsLocation.vue'
import FltrLocation from './Filters/Filters.vue'

export default {
    props: [ 'location_types', 'locations', 'meta_data' ],
    data () {
        return {
            inputs: {
                location_name: '',
                location_type: '',
                location_id: '',
            },
            filterLocations: [ 'Moon', 'Station' ]
        }
    },
    computed: {
        srtLocationsLst () { return this.mixKeySrt(this.locations, 'name') },
        fltLoc () {
            return this.locations.filter( loc => {
                if ( !this.filterLocations.length ) {
                    return true
                } else {
                    return this.filterLocations.find( fLoc => {
                        return loc.type === fLoc
                    })
                }
            })
        },
    },
    methods: {
        openModal( modal ) {
            this.$bus.$emit('toggleModal', modal )
        },
        save( modal ) {
            const location = {
                name: this.inputs.location_name,
                type: this.inputs.location_type,
                resources: [],
                location_id: this.inputs.location_id
            }

            const valid = this.mixinsValidate( this.meta_data.validation_rules.location, location, 'locations' )
            if( valid === 'true' ) {
                this.apiSave( 'locations', location, modal )
                this.inputs.location_name = ''
                this.inputs.location_type = ''
            }
        }
    },
    mounted() {
        this.$bus.$on('filter', ( filter, location, checked ) => {
            this.mixFltrBy( filter, location, checked )
        })
    },
    components: {
        LocationsLocation,
        FltrLocation
    }
}
</script>

<style lang="css">
    .locations {
        float: left;
        width: 80%;
    }
</style>
