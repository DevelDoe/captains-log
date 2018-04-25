<template lang="html">
    <div class="location-resource">
        <div v-if="resource">
            {{ resource_index }}
            {{ resource.name }}
            <span v-if="resource.sell">Sell: {{ mixFormatPrice( resource.sell ) }}</span>
            <span v-if="resource.buy">Buy: {{ mixFormatPrice( resource.buy ) }}</span> aUEC
            <button @click="deleteResource()">delete</button>
        </div>
    </div>
</template>

<script>
export default {
    props: [ 'resource_index', 'resource' ],
    methods: {
        deleteResource () {
            this.$bus.$emit('deleteResource', this.resource.index)
        }
    }
}
</script>

<style lang="css">
</style>
