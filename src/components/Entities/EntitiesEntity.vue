<template lang="html">
    <div id="entities-entity">
        <router-link :to="{ name: 'entity-details', query: { entity_id: entity._id, entity_index: entity_index } }">
            {{ entity.name }}
        </router-link>
    </div>
</template>

<script>
export default { props: [ 'entity', 'entity_index' ] }
</script>
