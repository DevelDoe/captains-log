<template lang="html">
    <div class="outpost-resource">
        <div v-if="resource">
            {{ resource.name }}
            {{ formatPrice(resource_price) }} aUEC
            <button @click="deleteResource">delete</button>
        </div>
    </div>
</template>

<script>
import { bus } from '../../root'
export default {
    props: [ 'resource_index', 'outpost_resource', 'resources', 'resource_price' ],
    methods: {
        formatPrice(value) {
            return (value/1).toFixed(2)
        },
        deleteResource () {
            bus.$emit('deleteResource', this.resource_index)
        }
    },
    computed: {
        resource () { return this.resources.find(r => r._id === this.outpost_resource) || null }
    }
}
</script>

<style lang="css">
</style>
