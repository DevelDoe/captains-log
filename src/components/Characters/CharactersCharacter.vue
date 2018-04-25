<template lang="html">
    <div id="characters-character">
        <router-link :to="{ name: 'Character', query: { character_id: character._id, character_index: index } }">
            <h4>{{ character.name }}</h4>
        </router-link>
    </div>
</template>

<script>
export default {
    props: [ 'character', 'index' ]
}
</script>
