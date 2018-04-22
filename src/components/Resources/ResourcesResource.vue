<template lang="html">
    <div id="resource">
        <router-link :to="{ name: 'resource-details', query: {
            resource_id: resource._id,
            resource_index: index
        }}">
            <h4>{{ resource.name }}</h4>
        </router-link>
    </div>
</template>

<script>
export default {
    props: [ 'resource', 'index' ]
}
</script>
