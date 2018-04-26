<template>
    <div id="resources">
        <DevelModal modal="addResource">
            <div slot="header"> <h2>Add Resource</h2> </div>
            <div slot="bread">
                <form id="modal-form">
                    <input type="text" v-model="input.name" placeholder="Name">
                </form>
            </div>
            <div slot="footer">
                <div class="form-control">
                    <button type="button" @click="save('addResource')">save</button>
                </div>
            </div>
        </DevelModal>
        <header> <h2>Resources</h2> </header>
        <section class="main">
            <div class="filter-search">
                <form>
                    <input v-model="filter_search" placeholder="search">
                </form>
            </div>
            <ResourcesResource v-for="(o, i) in filterSearch" :key="i"
            :resource="o"
            :index="i"
        />
        </section>
        <footer>
            <div class="form-control">
                <button @click="openModal('addResource')">add new resource</button>
            </div>
        </footer>
    </div>
</template>

<script>
import ResourcesResource from './ResourcesResource.vue'
export default {
    props: [ 'resources', 'meta_data' ],
    data() {
        return {
            input: { name: '' },
            filter_search: ''
        }
    },
    computed: {
        filterSearch() { return this.sortedResourcesList.filter( resource => {
            return resource.name.toLowerCase().indexOf( this.filter_search.toLowerCase() ) > - 1
        })},
        sortedResourcesList () { return this.mixKeySrt( this.resources, 'name' ) } },
    methods: {
        openModal( modal ) {
            this.$bus.$emit('toggleModal', modal )
        },
        save( modal ) {
            const resource = {
                name: this.input.name
            }
            const valid = this.mixinsValidate( this.meta_data.validation_rules.resource, resource, 'resources' )
            if( valid === 'true' ) {
                this.apiSave( 'resources', resource, modal  )
                this.input.name = ''
            }
        }
    },
    components: {
        ResourcesResource
    },
}
</script>
