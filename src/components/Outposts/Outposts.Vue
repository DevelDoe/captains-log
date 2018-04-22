<template>
    <div class="outposts">
        <DevelModal modal="addOutpost">
            <div slot="header">
                <h2>Add Outpost</h2>
            </div>
            <div slot="bread">
                <form id="modal-form">
                    <input type="text" v-model="outpost.name" placeholder="Outpost name">
                    <select v-model="outpost.location_id">
                        <option v-for='location in locations' :value="location._id" >{{ location.name }}</option>
                    </select>
                </form>
            </div>
            <div slot="footer">
                <div class="form-control">
                    <button type="button" @click="save('addOutpost')">save</button>
                </div>
            </div>
        </DevelModal>
        <header> <h2>Outposts</h2> </header>
        <section class="main">
            <OutpostsOutpost v-for='(o, i) in sortedOutpostsList' :key="outpost._id" :outpost="o" :index="i"/>
        </section>
        <footer>
            <div class="form-control">
                <button @click="openModal('addOutpost')">add new outpost</button>
            </div>
        </footer>
    </div>
</template>

<script>
import { bus } from '../../root'
import OutpostsOutpost from './OutpostsOutpost.vue'
export default {
    props: [ 'outposts', 'locations', 'meta_data' ],
    data () {
        return {
            outpost: { name: '', location_id: '', resources: []}
        }
    },
    computed: { sortedOutpostsList () { return this.mixinsSortList(this.outposts) } },
    methods: {
        openModal( modal ) {
            this.mixinsToggleModal( modal )
        },
        save( modal ) {
            const valid = this.mixinsToggleModal( modal, this.meta_data.validation_rules.outpost, this.outpost)
            if (valid) {
                bus.$emit('save', 'outposts', this.outpost )
                this.outpost.name = ''
                this.outpost.location = ''
            }
        }
    },
    components: {
        OutpostsOutpost
    }
}
</script>
