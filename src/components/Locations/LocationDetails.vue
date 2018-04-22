<template>
    <div id="locations-location-details" v-if="location">
        <DevelModal modal="updateLocation">
            <div slot="header"> <h2>Update Location</h2> </div>
            <div slot="bread">
                <form id="modal-form">
                    <input type="text" v-model="location.name" placeholder="Name">
                    <input type="text" v-model="location.type" placeholder="Type">
                </form>
            </div>
            <div slot="footer">
                <div class="form-control">
                    <button @click="update('updateLocation')">save</button>
                </div>
            </div>
        </DevelModal>
        <div class="backBtn">
            <router-link :to="{ name: 'locations', params: {} }">&#10149</router-link>
        </div>
        <header>
            <h2>{{ location.name }}</h2>
            <h4>{{ location.type }}</h4>
        </header>
        <div class="main">
            <h5>Outposts</h5>
            <LocationDetailsOutpost v-for="(o, i) in locationOutposts" :key="i" :outpost="o"/>
        </div>
        <footer>
            <div class="app-controls">
                <button @click="openModal('updateLocation')">update</button>
                <button v-if="location.type === 'Moon'" @click="addOutpost(location._id)">add outpost</button>
                <button @click="del()">delete</button>
            </div>
        </footer>
    </div>
</template>

<script>
import { bus } from '../../root'
import LocationDetailsOutpost from './LocationDetailsOutpost.vue'
export default {
    props: [ 'locations', 'outposts', 'meta_data' ],
    data () {
        return {
            location_id: this.$route.query.location_id,
            location_index: this.$route.query.location_index
        }
    },
    methods: {
        openModal(modal) {
            this.mixinsToggleModal(modal)
        },
        update(modal) {
            const valid = this.mixinsToggleModal(modal, this.meta_data.validation_rules.location, this.location)
            if (valid) bus.$emit('update', 'locations', this.location, this.location_id )
        },
        del() {
            bus.$emit('delete', 'locations', this.location_id, this.location_index)
        },
        addOutpost (id) {
            this.$router.push({ name: 'outposts', query: { location_id: id} })
        }
    },
    computed: {
        location () { return this.locations.find(l => l._id === this.location_id ) || null },
        locationOutposts () { return this.outposts.filter(o => o.location_id === this.location_id ) || null }
    },
    components: { LocationDetailsOutpost }
}
</script>
