<template lang="html">
    <div id="characters-character-details" v-if="character">
        <div class="backBtn"> <router-link :to="{ name: 'characters' }">&#10149</router-link> </div>
        <header>
            <h2>{{ character.name }}</h2>
            <h3 v-if="character.location">{{ character.location }}</h3>
        </header>
        <section class="main"> </section>
        <footer> <div class="app-controls"> <button @click="deleteData('characters', character._id, index)">delete</button> </div> </footer>
    </div>
</template>

<script>
import { bus } from '../../root'
export default {
    props: [ 'characters' ],
    methods: {
        deleteData(type, id, index) {
            bus.$emit('deleteData', [type, id, index])
            this.$router.push({ path: 'characters' })
        }
    },
    computed: {
        character () { return this.characters.find(p => p._id === this.$route.query.id) || null },
        index () { return this.$route.query.index || null }
    }
}
</script>
