<template>
    <div id="home">
        <HomeResource v-for="resource in resources" :key="resource._id"
            :resource="resource"
            :locations="locations"
            />
    </div>
</template>

<script>
import HomeResource from './HomeResource.vue'
export default {
    props: [ 'resources', 'locations' ],
    components: { HomeResource }
}
</script>
