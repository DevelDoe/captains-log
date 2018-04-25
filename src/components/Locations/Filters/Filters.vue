<template lang="html">
    <div class="filters">
        <h3>Locations</h3>
        <Location v-for="( location, i ) in meta_data.location_filters" :key="i" :location="location" />
    </div>
</template>

<script>
import Location from './Location.vue'
export default {
    props: [ 'meta_data' ],
    components: {
        Location
    }
}
</script>

<style lang="css">
    .filters {
        float: right;
        width: 20%;
    }
</style>
