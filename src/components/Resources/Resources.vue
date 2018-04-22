<template>
    <div id="resources">
        <DevelModal modal="addResource">
            <div slot="header"> <h2>Add Resource</h2> </div>
            <div slot="bread">
                <form id="modal-form">
                    <input type="text" v-model="resource.name" placeholder="Name">
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
            <ResourcesResource v-for="(resource, index) in resources" :key="resource.id"
            :resource="resource"
            :index="index"
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
import { bus } from '../../root'
import ResourcesResource from './ResourcesResource.vue'
export default {
    props: [ 'resources', 'meta_data' ],
    data() {
        return {
            resource: { name: '' }
        }
    },
    methods: {
        openModal(modal) {
            this.mixinsToggleModal(modal)
        },
        save (modal) {
            const valid = this.mixinsToggleModal(modal, this.meta_data.validation_rules.resource, this.resource)
            if (valid) {
                bus.$emit('save', 'resources', this.resource )
                this.resource.name = ''
            }
        }
    },
    computed: {
        sortedResourcesList () {
            return this.mixinsSortList(this.resources)
        }
    },
    components: {
        ResourcesResource
    },
}
</script>
