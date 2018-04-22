<template lang="html">
    <div class="characters">
        <header>
            <h2>Non Playing Characters</h2>
            <DevelModal btn="add new character">
                <div slot="header"> <h2>Add Character</h2> </div>
                <div slot="bread">
                    <form id="modal-form">
                        <input type="text" v-model="character.name" placeholder="Name">
                        <input type="text" v-model="character.location" placeholder="Location">
                    </form>
                </div>
                <div slot="footer">
                    <div class="form-control">
                        <button type="button" @click="save">save</button>
                    </div>
                </div>
            </DevelModal>
        </header>
        <section class="main">
            <CharactersCharacter v-for="(o,i) in sortedCharactersList" :key="i"
                :character="o"
                :index="i"
            ></CharactersCharacter>
        </section>
    </div>
</template>

<script>
import { bus } from '../../root'
import CharactersCharacter from './CharactersCharacter.vue'
export default {
    props: [ 'characters' ],
    data () {
        return {
            character: {
                name: '',
                location: ''
            },
            characterValidation: {
                name: true,
                location: false
            }
        }
    },
    computed: {
        sortedCharactersList () { return this.mixinsSortList( this.characters ) || null}
    },
    methods: {
            save () {
                const success = this.mixinsToggleModal(this.character, this.characterValidation, 'characters')
                if (success) {
                    this.character.name = ''
                    this.character.location = ''
                }
            }
    },
    components: {
        CharactersCharacter
    }
}
</script>
