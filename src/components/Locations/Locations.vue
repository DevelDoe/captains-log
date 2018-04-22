<template>
    <div id="locations-index">
        <DevelModal modal="addLocation">
            <div slot="header"> <h2>Add Location</h2> </div>
            <div slot="bread">
                <form id="modal-form">
                    <input type="text" v-model="location.name" placeholder="Name">
                    <input type="text" v-model="location.type" placeholder="Type">
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
            <LocationsLocation v-for='(location, i) in locations' :key="i"
                :location="location"
                :index="i"
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
import { bus } from '../../root'
export default {
    props: [ 'locations', 'meta_data' ],
    data () {
        return {
            location: {
                name: '',
                type: ''
            }
        }
    },
    methods: {
        openModal(modal) {
            this.mixinsToggleModal(modal)
        },
        save(modal) {
            const valid = this.mixinsToggleModal(modal, this.meta_data.validation_rules.location, this.location)
            if (valid) {
                bus.$emit('save', 'locations', this.location )
                this.location.name = ''
                this.location.type = ''
            }
        }
    },
    components: { LocationsLocation }
}
</script>

<style lang="css">
</style>
