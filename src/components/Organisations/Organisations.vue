<template lang="html">
    <div id="organisations">
        <DevelModal modal="addOrg">
            <div slot="header"> <h2>Add Organisations</h2> </div>
            <div slot="bread">
                <form id="modal-form">
                    <input type="text" v-model="organisation.name" placeholder="Name">
                    <textarea v-model="organisation.description" rows="8" cols="80" placeholder="About"></textarea>
                    <select v-model="organisation.location_id">
                        <option v-for="( o, i) in srtLocLst" :value="o._id">{{ o.name }}</option>
                    </select>
                </form>
            </div>
            <div slot="footer">
                <div class="form-control">
                    <button type="button" @click="save('addOrg')">save</button>
                </div>
            </div>
        </DevelModal>

        <header> <h2>Organisations</h2> </header>
        <section class="main">
            <OrganisationsOrganisation v-for="( o, i ) in srtOrgLst" :key="i"
                :organisation="o"
                :index="i"

            ></OrganisationsOrganisation>
        </section>
        <footer>
            <div class="form-control">
                <button @click="openModal('addOrg')">add new organisation</button>
            </div>
        </footer>
    </div>
</template>

<script>
import OrganisationsOrganisation from './OrganisationsOrganisation.vue'
export default {
    props: [ 'organisations', 'locations', 'meta_data' ],
    data () {
        return {
            organisation: {
                name: '',
                description: '',
                location_id: ''
            }
        }
    },
    computed: {
        srtOrgLst() { return this.mixKeySrt( this.organisations, 'name' ) || null },
        srtLocLst() { return this.mixKeySrt( this.locations, 'name' ) || null }
    },
    methods: {
        openModal( modal ) {
            this.$bus.$emit('toggleModal', modal )
        },
        save ( modal ) {
            const organisation = {
                name: this.organisation.name,
                description:  this.organisation.description,
                location_id: this.organisation.location_id
            }
            const valid = this.mixinsValidate( this.meta_data.validation_rules.organisation, organisation)
            if ( valid === 'true' ) {
                this.apiSave( 'organisations', organisation, modal  )
                this.organisation.name = ''
                this.organisation.description = ''
                this.location_id = ''
            }
        }
    },
    components: { OrganisationsOrganisation }
}
</script>

<style lang="css">
</style>
