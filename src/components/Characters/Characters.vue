<template lang="html">
    <div class="characters">
        <DevelModal modal="addCharacter">
            <div slot="header"> <h2>Add Character</h2> </div>
            <div slot="bread">
                <form id="modal-form">
                    <input type="text" v-model="character.name" placeholder="Name">
                    <textarea v-model="character.description" rows="8" cols="80" placeholder="Biography"></textarea>
                    <select v-model="character.location_id">
                        <option v-for="( o, i) in srtLocLst" :value="o._id">{{ o.name }}</option>
                    </select>
                </form>
            </div>
            <div slot="footer">
                <div class="form-control">
                    <button type="button" @click="save('addCharacter')">save</button>
                </div>
            </div>
        </DevelModal>

        <header> <h2>Non Playing Characters</h2> </header>
        <section class="main">
            <CharactersCharacter v-for="(o,i) in srtCharLst" :key="i"
                :character="o"
                :index="i"
            ></CharactersCharacter>
        </section>
        <footer>
            <div class="form-control">
                <button @click="openModal('addCharacter')">add new resource</button>
            </div>
        </footer>
    </div>
</template>

<script>
import CharactersCharacter from './CharactersCharacter.vue'
export default {
    props: [ 'characters', 'locations', 'meta_data' ],
    data () {
        return {
            character: {
                name: '',
                description: '',
                location_id: ''
            }
        }
    },
    computed: {
        srtCharLst() { return this.mixKeySrt( this.characters, 'name' ) || null },
        srtLocLst() { return this.mixKeySrt( this.locations, 'name' ) || null },
    },
    methods: {
        openModal( modal ) {
            this.$bus.$emit('toggleModal', modal )
        },
        save ( modal ) {
            const character = {
                name: this.character.name,
                description:  this.character.description,
                location_id: this.character.location_id
            }
            const valid = this.mixinsValidate( this.meta_data.validation_rules.character, character)
            if ( valid === 'true' ) {
                this.apiSave( 'characters', character, modal  )
                this.character.name        = ''
                this.character.description = ''
                this.character.location_id = ''
            }
        }
    },
    components: {
        CharactersCharacter
    }
}
</script>
