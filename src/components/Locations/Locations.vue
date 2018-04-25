<template>
    <div id="locations-index">
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
        <section class="main">
            <LocationsLocation v-for='( o, i) in sortedLocationsList' :key="i"
                :location="o"
                :index="i"
                :type="o.type"
            />
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

export default {
    props: [ 'location_types', 'locations', 'meta_data' ],
    data () {
        return {
            inputs: {
                location_name: '',
                location_type: '',
                location_id: '',
            }
        }
    },
    computed: { sortedLocationsList () { return this.mixKeySrt(this.locations, 'name') } },
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

            const valid = this.mixinsValidate( this.meta_data.validation_rules.location, location )
            if( valid === 'true' ) {
                this.apiSave( 'locations', location, modal )
                this.inputs.location_name = ''
                this.inputs.location_type = ''
            }
        }
    },
    components: { LocationsLocation }
}
</script>

<style lang="css">
</style>
