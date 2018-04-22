<template lang="html">
    <div id="missions-mission-details" v-if="mission">

        <div class="backBtn">
            <router-link :to="{ name: 'missions' }">&#10149</router-link>
        </div>

        <header>
            <h2>{{ mission.name }}</h2>
            <h4>{{ mission.type }}</h4>
            <h4>payment: {{ mission.payment }}</h4>
            <h4>from {{ giver.name }}</h4>
        </header>

        <section class="main">
            <h4>Description:</h4>
            <p>{{ mission.description }}</p>
            <h4>Objectives:</h4>
            <ul>
                <li v-for="objective in mission.objectives">{{ objective.value }}</li>
            </ul>
        </section>

        <footer>
            <div class="app-controls">
                <button @click="deleteData('missions', mission._id, index)">delete</button>
            </div>
        </footer>

    </div>
</template>

<script>
import { bus } from '../../root'
export default {
    props: [ 'missions', 'characters', 'entities' ],
    methods: {
        deleteData(type, id, index) {
            bus.$emit('deleteData', [type, id, index])
            this.$router.push({ path: 'missions' })
        }
    },
    computed: {
        mission () { return this.missions.find(m => m._id === this.$route.query.id) || null },
        charactersAndEntities () { return this.characters.concat(this.entities) || null },
        giver () { return this.charactersAndEntities.find(p => p._id === this.mission.giver_id) || null},
        index () { return this.$route.query.index || null }
    }
}
</script>
