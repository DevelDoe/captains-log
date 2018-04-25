<template lang="html">
    <div id="resource">
        <router-link :to="{ name: 'resource-details', query: {
            resource_id: resource._id,
            resource_index: index
        }}">
            <span>{{ resource.name }}</span>
        </router-link>
    </div>
</template>

<script>
export default {
    props: [ 'resource', 'index' ]
}
</script>
