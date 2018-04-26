<template lang="html">
    <div class="organisation-details" v-if="organisation">
        <DevelModal modal="updateOrg">
            <div slot="header">
                <h2>Update Organisation</h2>
            </div>
            <div slot="bread">
                <form id="modal-form">
                    <input type="text" v-model="organisation.name" placeholder="Name">
                    <textarea v-model="organisation.description" rows="8" cols="80" placeholder="Biography"></textarea>
                    <select v-model="organisation.location_id">
                        <option v-for="( o, i) in srtLocLst" :value="o._id">{{ o.name }}</option>
                    </select>
                </form>
            </div>
            <div slot="footer">
                <div class="form-control">
                    <button @click="update('updateOrg')">save</button>
                </div>
            </div>
        </DevelModal>


        <div class="backBtn"><button @click="$router.go(-1)">go back</button></div>
        <header >
            <h2>{{ organisation.name }}</h2>
            <p v-if="location">Location: {{ location.name }}</p>
        </header>
        <section class="main">
            <div v-if="organisation.description">
                <h3>About</h3>
                <span v-html="$markdown.render(organisation.description)"></span>
            </div>
        </section>
        <footer>
            <div class="app-controls">
                <button @click="openModal('updateOrg')">update</button>
                <button @click="del()">delete</button>
            </div>
        </footer>
    </div>
</template>

<script>
export default {
    props: [ 'organisations', 'locations', 'meta_data' ],
    data() {
        return {
            organisation_index: this.$route.query.organisation_index,
            organisation_id: this.$route.query.organisation_id
        }
    },
    methods: {
        openModal( modal ) {
            this.$bus.$emit('toggleModal', modal )
        },
        del() {
            this.apiDelete( 'organisations', this.organisation_id, this.organisation_index)
        },
        update( modal ) {
            const valid = this.mixinsValidate( this.meta_data.validation_rules.organisation, this.organisation, 'organisations', this.organisation_index)
            if( valid === 'true' ) this.apiUpdate( 'organisations', this.organisation, this.organisation_id, modal )
        }
    },
    computed: {
        organisation () { return this.organisations.find(o => o._id === this.organisation_id) || null },
        location() { return this.locations.find( l => l._id === this.organisation.location_id ) || null },
        srtLocLst() { return this.mixKeySrt( this.locations, 'name' ) || null }
    }
}
</script>
