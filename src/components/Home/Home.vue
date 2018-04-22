<template>
    <div id="home">
        <HomeResource v-for="resource in resources" :key="resource._id"
            :resource="resource"
            :outposts="outposts"
            />
    </div>
</template>

<script>
import HomeResource from './HomeResource.vue'
export default {
    props: [ 'resources', 'outposts' ],
    components: { HomeResource }
}
</script>
