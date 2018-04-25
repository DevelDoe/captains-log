<template lang="html">
    <div id="organisations-organisation">
        <router-link :to="{ name: 'Organisation', query: { organisation_id: organisation._id, organisation_index: index } }">
            {{ organisation.name }}
        </router-link>
    </div>
</template>

<script>
export default { props: [ 'organisation', 'index' ] }
</script>
