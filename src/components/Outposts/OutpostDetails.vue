<template lang="html">
    <div id="outposts-outpost-details" v-if="outpost && location">
        <DevelModal modal="updateOutpost">
            <div slot="header">
                <h2>Update Outpost</h2>
            </div>
            <div slot="bread">
                <form id="modal-form">
                    <input type="text" v-model="outpost.name" placeholder="Outpost name">
                    <select v-model="outpost.location">
                        <option v-for='location in locations' :value="location._id" >{{ location.name }}</option>
                    </select>
                </form>
            </div>
            <div slot="footer">
                <div class="form-control">
                    <button type="button" @click="updateOutpost('updateOutpost')">save</button>
                </div>
            </div>
        </DevelModal>
        <DevelModal modal="addResource">
            <div slot="header"><h2>Add Resource</h2></div>
            <div slot="bread">
                <form id="modal-form">
                    <select v-model="resource">
                        <option v-for='resource in resources' :value="resource._id" >{{ resource.name }}</option>
                    </select>
                    <input type="text" v-model="outpost_resource_price" placeholder="Price">
                </form>
            </div>
            <div slot="footer">
                <div class="form-control">
                    <button type="button" @click="addResource('addResource')">save</button>
                </div>
            </div>
        </DevelModal>

        <div class="backBtn"><router-link :to="{ name: 'outposts' }">&#10149</router-link></div>

        <header v-if="outpost">
            <h2>{{ outpost.name }}</h2>
            <h4>{{ location.name }}</h4>
        </header>

        <section class="main">
            <OutpostDetailsResource v-for="(r, i) in outpost.resources" :key="i"
                :resource_index="i"
                :outpost_resource="r.resource"
                :resource_price="r.resource_price"
                :resources="resources"
            />
        </section>

        <footer>
            <div class="app-controls">
                <button @click="openModal('updateOutpost')">update</button>
                <button @click="openModal('addResource')">add resource</button>
                <button @click="del()">delete</button>
            </div>
        </footer>

    </div>
</template>

<script>
import { bus } from '../../root'
import OutpostDetailsResource from './OutpostDetailsResource.vue'
export default {
    props: [ 'locations', 'outposts', 'resources', 'meta_data'],
    data () {
        return {
            outpost_id: this.$route.query.outpost_id,
            outpost_index: this.$route.query.outpost_index,
            resource: '',
            outpost_resource_price: ''
        }
    },
    computed: {
        outpost () { return this.outposts.find( o => o._id === this.outpost_id ) || null },
        location () { return this.locations.find( l => l._id === this.outpost.location ) || null },
    },
    methods: {
        openModal( modal ) {
            this.mixinsToggleModal( modal )
        },
        addResource ( modal ) {
            const valid = this.mixinsToggleModal(modal,  this.meta_data.validation_rules.outpost.resources, { resource: this.resource, price: this.outpost_resource_price })
            if( valid ) {
                this.outpost.resources.push({ resource: this.resource, resource_price: this.outpost_resource_price })
                this.updateOutpost( modal, false)
            }
        },
        updateOutpost ( modal, validate = true) {
            let valid = true
            if( validate ) {
                valid = this.mixinsToggleModal(modal,  this.meta_data.validation_rules.outpost, this.outpost)
            }
            if (valid) bus.$emit('update', 'outposts', this.outpost, this.outpost_id )
        },
        del() {
            bus.$emit('delete', 'outposts', this.outpost_id, this.outpost_index)
            this.$router.push({ path: 'outposts' })
        }
    },
    components: { OutpostDetailsResource },
    mounted () {
        bus.$on('deleteResource', data => {
            this.outpost.resources.splice(data, 1)
            this.updateOutpost( 'updateResource' )
        })
    }
}
</script>

<style lang="css">
</style>
