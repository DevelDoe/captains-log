<template lang="html">
    <div id="missions-mission-details" v-if="mission">

        <DevelModal modal="updateMission">
            <div slot="header">
                <h2>Update Character</h2>
            </div>
            <div slot="bread">
                <form id="modal-form">
                    <input type="text" v-model="mission.name" placeholder="Mission Name">
                    <input type="text" v-model="mission.type" placeholder="Mission type">
                    <textarea rows="8" cols="80" v-model="mission.description" placeholder="Mission description"></textarea>
                    <input type="text" v-model="mission.payment" placeholder="Mission payment">
                    <div v-for="( objective, i ) in mission.objectives">
                        <input type="text" v-model="objective.description"><button @click="removeObjective(i)">remove</button>
                    </div>
                    <select v-model="mission.giver_id">
                        <option value="" selected>Mission giver</option>
                        <option v-for="giver in charactersAndEntities" :value="giver._id">{{ giver.name }}</option>
                    </select>
                </form>
            </div>
            <div slot="footer">
                <div class="form-control">
                    <button @click="addObjective">add objective</button>
                    <button @click="update('updateMission')">save</button>
                </div>
            </div>
        </DevelModal>


        <div class="backBtn"><button @click="$router.go(-1)">go back</button></div>
        <header>
            <h2>{{ mission.name }}</h2>
            <h4>{{ mission.type }}</h4>
            <h4>payment: {{ mission.payment }}</h4>
            <h4>from {{ giver.name }}</h4>
        </header>

        <section class="main">
            <h4>Description:</h4>
            <span v-html="$markdown.render(mission.description)"></span>

            <h4>Objectives:</h4>
            <ul>
                <li v-for="objective in mission.objectives">{{ objective.description }}</li>
            </ul>
        </section>

        <footer>
            <div class="app-controls">
                <button @click="openModal('updateMission')">update</button>
                <button @click="del()">delete</button>
            </div>
        </footer>

    </div>
</template>

<script>
export default {
    props: [ 'missions', 'characters', 'organisations', 'meta_data' ],
    data() {
        return {
            mission_index: this.$route.query.mission_index,
            mission_id: this.$route.query.mission_id
        }
    },
    methods: {
        openModal( modal ) {
            this.$bus.$emit('toggleModal', modal )
        },
        addObjective () {
            this.mission.objectives.push({ description: '' })
        },
        removeObjective( index ) {
            this.mission.objectives.splice(index, 1)
        },
        del() {
            this.apiDelete( 'missions', this.mission_id, this.mission_index)
        },
        update( modal ) {
            const valid = this.mixinsValidate( this.meta_data.validation_rules.mission, this.mission, 'missions', this.mission_index)

            if ( valid === 'true') this.apiUpdate( 'missions', this.mission, this.mission_id, modal )
        }
    },
    computed: {
        mission () { return this.missions.find(m => m._id === this.mission_id) || null },
        charactersAndEntities () { return this.characters.concat(this.organisations) || null },
        giver () { return this.charactersAndEntities.find(p => p._id === this.mission.giver_id) || null},
        index () { return this.mission_index || null }
    }
}
</script>
