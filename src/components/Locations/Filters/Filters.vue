<template lang="html">
    <div class="filters">
        <h3>Locations</h3>
        <Locations v-for="( l, i ) in locations" :key="i" :location="l" />
    </div>
</template>

<script>
import Locations from './Locations.vue'
export default {
    props: [ 'locations' ],
    components: {
        Locations
    }
}
</script>

<style lang="css">
</style>
