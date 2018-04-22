<template lang="html">
    <div id="missions">
        <header>
            <h2>Missions</h2>
            <DevelModal modal="addMission">
                <div slot="header"> <h2>Add Mission</h2> </div>
                <div slot="bread">
                    <form id="modal-form">
                        <input type="text" v-model="mission.name" placeholder="Mission Name">
                        <input type="text" v-model="mission.type" placeholder="Mission type">
                        <textarea rows="8" cols="80" v-model="mission.description" placeholder="Mission description"></textarea>
                        <input type="text" v-model="mission.payment" placeholder="Mission payment">
                        <div v-for="objective in mission.objectives">
                            <input type="text" v-model="objective.description">
                        </div>
                        <select v-model="mission.giver">
                            <option value="" selected>Mission giver</option>
                            <option v-for="giver in charactersAndEntities" :value="giver._id">{{ giver.name }}</option>
                        </select>
                    </form>
                </div>
                <div slot="footer">
                    <div class="form-control">
                        <button @click="addObjective">add objective</button>
                        <button type="button" @click="save('addMission')">save</button>
                    </div>
                </div>
            </DevelModal>
        </header>
        <section class="main">
            <MissionsMission v-for="(o,i) in sortedMissionList" :key="i"
                :mission="o"
                :index="i"
            ></MissionsMission>
        </section>
        <footer>
            <div class="form-control">
                <button @click="openModal('addMission')">add new outpost</button>
            </div>
        </footer>
    </div>
</template>

<script>
import { bus } from '../../root'
import MissionsMission from './MissionsMission.vue'
export default {
    props: [ 'missions', 'characters', 'entities', 'meta_data' ],
    data () {
        return {
            mission: {
                name: '',
                type: '',
                description: '',
                payment: '',
                giver: '',
                objectives: []
            }
        }
    },
    computed: {
        sortedMissionList () { return this.mixinsSortList( this.missions ) || null },
        charactersAndEntities () { return this.mixinsSortList( this.characters.concat(this.entities) ) || null }
    },
    methods: {
        addObjective () {
            this.mission.objectives.push({ description: '' })
        },
        save ( modal ) {
            const valid = this.mixinsToggleModal(modal, this.meta_data.validation_rules.mission, this.mission)
            if ( valid ) {
                this.mission.name = ''
                this.mission.type = ''
                this.mission.description = ''
                this.mission.payment = ''
                this.mission.giver_id = ''
                this.mission.objectives = []
            }
        }
    },
    components: {
        MissionsMission
    }
}
</script>
