<template lang="html">
    <div id="outpost-details" v-if="location">
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
                    <button @click="onUpdate('updateLocation')">save</button>
                </div>
            </div>
        </DevelModal>
        <DevelModal modal="addResource">
            <div slot="header"><h2>Add Resource</h2></div>
            <div slot="bread">
                <form id="modal-form">
                    Resource:
                    <select v-model="input.resource_id">
                        <option v-for='resource in resources' :value="resource._id" >{{ resource.name }}</option>
                    </select>
                    <input type="text" v-model="input.sell" placeholder="sell">
                    <input type="text" v-model="input.buy" placeholder="buy">
                </form>
            </div>
            <div slot="footer">
                <div class="form-control">
                    <button type="button" @click="addResource('addResource')">save</button>
                </div>
            </div>
        </DevelModal>

        <div class="backBtn"><button @click="$router.go(-1)">go back</button></div>
        <header>
            <h2>{{ location.name }}</h2>
            <h4>{{ location.type }}</h4>
        </header>
        <section class="main">
            <div v-if="comResources">
                <OutpostResource v-for="(r, i) in comResources" :key="i" :resource="r"/>
            </div>
        </section>
        <footer>
            <div class="app-controls">
                <button @click="openModal('updateLocation')">update</button>
                <button @click="openModal('addResource')">add resource</button>
                <button @click="del()">delete</button>
            </div>
        </footer>

    </div>
</template>

<script>
import OutpostResource from './OutpostResource.vue'
export default {
    props: [ 'locations', 'resources', 'meta_data', 'location_types'],
    data () {
        return {
            location_id: this.$route.query.location_id,
            location_index: this.$route.query.location_index,
            input: {
                resource_id: '',
                sell: '',
                buy: ''
            }
        }
    },
    computed: {
        location() { return this.locations.find(l => l._id === this.location_id ) || null },
        filteredAddLocationTypes()    { return this.location_types.filter( t => t.toLowerCase() !== "outpost")},
        filteredUpdateLocationTypes() {
            return this.location_types.filter( t => {
                return t.toLowerCase() === "outpost" || t.toLowerCase() === 'station'
            })
        },
        comResources() {
            if( this.location.resources ) {
                let res = []
                let count_index = 0
                this.location.resources.forEach( locResource => {

                    let item = {}
                    item._id  = locResource.resource_id
                    item.name = this.resources.find( allResource => allResource._id === locResource.resource_id ).name
                    item.sell = locResource.sell
                    item.buy  = locResource.buy
                    item.index = count_index
                    count_index++
                    res.push(item)
                })
                return this.mixKeySrt(res, 'name')
            }

        }
    },
    methods: {
        openModal( modal ) {
            this.$bus.$emit('toggleModal', modal )
        },
        onUpdate( modal ) {
            const valid = this.mixinsValidate( this.meta_data.validation_rules.location, this.location)
            if ( valid ) this.apiUpdate( 'locations', this.location, this.location_id, modal )
        },
        addResource ( modal ) {
            const resource = {
                resource_id: this.input.resource_id,
                sell: this.input.sell,
                buy: this.input.buy
            }
            const valid = this.mixinsValidate( this.meta_data.validation_rules.location.resources, resource)
            if( valid ) {
                this.location.resources.push( resource )
                this.apiUpdate( 'locations', this.location, this.location_id, modal )
                this.input.resource_id = ''
                this.input.sell = ''
                this.input.buy = ''
            }
        },
        del() {
            this.apiDelete( 'locations', this.location_id, this.location_index )
        }
    },
    mounted () {
        this.$bus.$on('deleteResource', data => {
            this.location.resources.splice(data, 1)
            this.apiUpdate( 'locations', this.location, this.location_id )
        })
    },
    components: { OutpostResource }
}
</script>

<style lang="css">
</style>
