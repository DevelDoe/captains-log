<template lang="html">
    <div id="home-resource">
        <router-link :to="{ name: 'resource-details', query: { resource_id: resource._id } }">
            {{ resource.name }}
        </router-link>
    </div>
</template>

<script>
export default {
    props: [ 'resource' ]
}
</script>

<style lang="css">
</style>
