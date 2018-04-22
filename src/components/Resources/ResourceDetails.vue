<template lang="html">
    <div id="resources-resource-details" v-if="resource">
        <DevelModal modal="updateResource">
            <div slot="header">
                <h2>Update Resource</h2>
            </div>
            <div slot="bread">
                <form id="modal-form">
                    <input type="text" v-model="resource.name" placeholder="Name">
                </form>
            </div>
            <div slot="footer">
                <div class="form-control">
                    <button @click="update('updateResource')">save</button>
                </div>
            </div>
        </DevelModal>

        <div class="backBtn"><button @click="$router.go(-1)">go back</button></div>
        <header> <h2>{{ resource.name }}</h2> </header>
        <section class="main">
            <div id="best-margin">
                <ul>
                    <li v-for="( o, i ) in comLocations"> {{ o.location }}:</strong>  SELL {{ o.sell }} BUY {{ o.buy }} </li>
                </ul>
            </div>
        </section>
        <footer>
            <div class="app-controls">
                <button @click="openModal('updateResource')">update</button>
                <button @click="del()">delete</button>
            </div>
        </footer>
    </div>
</template>

<script>
import { bus } from '../../root'
export default {
    props: [ 'resources', 'meta_data', 'locations' ],
    data () {
        return {
            resource_index      : this.$route.query.resource_index,
            resource_id         : this.$route.query.resource_id
        }
    },
    computed: {
        comLocations() {
            let res = []
            this.locations.forEach(location => {
                location.resources.forEach(resource => {
                    if( resource.resource_id === this.resource._id) {
                        res.push( { location: location.name, sell: resource.sell, buy: resource.buy })
                    }
                })

            })
            return res.sort((a, b) => parseFloat(a.sell) - parseFloat(b.sell))
        },
        resource () { return this.resources.find(r => r._id === this.resource_id) || null }
    },
    methods: {
        openModal(modal) {
            this.mixinsToggleModal(modal)
        },
        update(modal) {
            const valid = this.mixinsToggleModal(modal, this.meta_data.validation_rules.resource, this.resource)
            if (valid) bus.$emit('update', 'resources', this.resource, this.resource_id )
        },
        del() {
            bus.$emit('delete', 'resources', this.resource_id, this.resource_index)
        },
    }
}
</script>
