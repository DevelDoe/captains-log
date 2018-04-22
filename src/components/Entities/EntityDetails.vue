<template lang="html">
    <div class="entity-details">
        <div class="backBtn"> <router-link :to="{ name: 'entities' }">&#10149</router-link> </div>
        <header> <h2>{{ entity.name }}</h2> </header>
        <section class="main"></section>
        <footer> <div class="app-controls"> <button @click="deleteData('entities', entity._id, entity_index)">delete</button> </div></footer>
    </div>
</template>

<script>
import { bus } from '../../root'
export default {
    props: [ 'entities' ],
    methods: {
        deleteData(collection, entity_id, entity_index) {
            bus.$emit('deleteData', [collection, entity_id, entity_index])
            this.$router.push({ path: 'entities' })
        }
    },
    computed: {
        entity () { return this.entities.find(e => e._id === this.$route.query.entity_id) || null },
        entity_index () { return this.$route.query.entity_index || null }
    }
}
</script>
