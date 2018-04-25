<template lang="html">
    <div class="characters">
        <DevelModal modal="addCharacter">
            <div slot="header"> <h2>Add Character</h2> </div>
            <div slot="bread">
                <form id="modal-form">
                    <input type="text" v-model="input.name" placeholder="Name">
                    <textarea v-model="input.description" rows="8" cols="80" placeholder="Biography"></textarea>
                    <select v-model="input.location_id">
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
            input: {
                name: '',
                description: '',
                location_id: ''
            }
        }
    },
    computed: {
        srtCharLst() { return this.mixKeySrt( this.characters, 'name' ) || null },
        srtLocLst() { return this.mixKeySrt( this.locations, 'name' ) || null }
    },
    methods: {
        openModal( modal ) {
            this.$bus.$emit('toggleModal', modal )
        },
        save ( modal ) {
            const character = {
                name: this.input.name,
                description:  this.input.description,
                location_id: this.input.location_id
            }
            const valid = this.mixinsValidate( this.meta_data.validation_rules.character, character)
            if ( valid ) {
                this.apiSave( 'characters', character, modal  )
                this.input.name = ''
                this.input.description = ''
                this.input.location_id = ''
            }
        }
    },
    components: {
        CharactersCharacter
    }
}
</script>
