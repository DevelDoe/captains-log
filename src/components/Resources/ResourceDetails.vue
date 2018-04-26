<template lang="html">
    <div id="resources-resource-details" v-if="resource">
        <DevelModal modal="updateResource">
            <div slot="header">
                <h2>Update Resource</h2>
            </div>
            <div slot="bread">
                <form id="modal-form">
                    <input type="text" v-model="resource.name" placeholder="Name" />
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
            <div id="resource-locations">
                <ul>
                    <li v-for="( o, i ) in comLocations">
                        <strong>{{ o.location }}:</strong>
                        <span v-if="o.sell">SELL {{ o.sell }}</span>
                        <span v-if="o.buy">BUY {{ o.buy }}</span>
                    </li>
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
export default {
    props: [ 'resources', 'meta_data', 'locations' ],
    data () {
        return {
            resource_index      : this.$route.query.resource_index,
            resource_id         : this.$route.query.resource_id,
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
            this.$bus.$emit('toggleModal', modal )
        },
        update( modal ) {
            const valid = this.mixinsValidate( this.meta_data.validation_rules.resource, this.resource, 'resources', this.resource_index)
            if( valid === 'true' ) this.apiUpdate( 'resources', this.resource, this.resource_id, modal )
        },
        del() {
            this.apiDelete( 'resources', this.resource_id, this.resource_index)
        },
    },

}
</script>
