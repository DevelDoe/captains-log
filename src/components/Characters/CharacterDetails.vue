<template lang="html">
    <div id="characters-character-details" v-if="character">

        <DevelModal modal="updateCharacter">
            <div slot="header">
                <h2>Update Character</h2>
            </div>
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
                    <button @click="update('updateCharacter')">save</button>
                </div>
            </div>
        </DevelModal>


        <div class="backBtn"><button @click="$router.go(-1)">go back</button></div>
        <header>
            <h2>{{ character.name }}</h2>
            <p v-if="location">Location: {{ location.name }}</p>
        </header>
        <section class="main">
            <div v-if="character.description">
                <h3>Biography</h3>
                <span v-html="character.description"></span>
            </div>
        </section>
        <footer>
            <div class="app-controls">
                <button @click="openModal('updateCharacter')">update</button>
                <button @click="del()">delete</button>
            </div>
        </footer>
    </div>
</template>

<script>

export default {
    props: [ 'characters', 'locations', 'meta_data' ],
    data() {
        return {
            character_index: this.$route.query.character_index,
            character_id: this.$route.query.character_id
        }
    },
    methods: {
        openModal( modal ) {
            this.$bus.$emit('toggleModal', modal )
        },
        del() {
            this.apiDelete( 'characters', this.character._id, this.character_index)
        },
        update( modal ) {
            const valid = this.mixinsValidate( this.meta_data.validation_rules.character, this.character)
            if( valid === 'true' ) this.apiUpdate( 'characters', this.character, this.character_id, modal )
        }
    },
    computed: {
        character () { return this.characters.find( p => p._id === this.$route.query.character_id ) || null },
        location() { return this.locations.find( l => l._id === this.character.location_id ) || null },
        srtLocLst() { return this.mixKeySrt( this.locations, 'name' ) || null }
    }
}
</script>
