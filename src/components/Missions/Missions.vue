<template lang="html">
    <div id="missions">
        <DevelModal modal="addMission">
            <div slot="header"> <h2>Add Mission</h2> </div>
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
                    <button type="button" @click="save('addMission')">save</button>
                </div>
            </div>
        </DevelModal>

        <header> <h2>Missions</h2> </header>
        <section class="main">
            <MissionsMission v-for="(o,i) in srtMissionLst" :key="i"
                :mission="o"
                :index="i"
            ></MissionsMission>
        </section>
        <footer>
            <div class="form-control">
                <button @click="openModal('addMission')">add new mission</button>
            </div>
        </footer>
    </div>
</template>

<script>
import MissionsMission from './MissionsMission.vue'
export default {
    props: [ 'missions', 'characters', 'organisations', 'meta_data' ],
    data () {
        return {
            mission: {
                name: '',
                type: '',
                description: '',
                payment: '',
                giver_id: '',
                objectives: []
            }
        }
    },
    computed: {
        srtMissionLst () { return this.mixKeySrt( this.missions, 'name' ) || null },
        charactersAndEntities () { return this.mixKeySrt( this.characters.concat(this.organisations), 'name' ) || null }
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
        save ( modal ) {
            const valid = this.mixinsValidate( this.meta_data.validation_rules.mission, this.mission)
            if ( valid ) {
                this.apiSave( 'missions', this.mission, modal  )
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
