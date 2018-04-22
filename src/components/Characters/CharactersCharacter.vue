<template lang="html">
    <div id="characters-character">
        <router-link :to="{ name: 'character-details', query: { id: character._id, index: index } }">
            <h4>{{ character.name }}</h4>
        </router-link>
    </div>
</template>

<script>
export default { props: [ 'character', 'index' ] }
</script>
