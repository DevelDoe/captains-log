<template lang="html">
    <div id="entities">
        <header>
            <h2>Entities</h2>
            <DevelModal btn="add new entity">
                <div slot="header"> <h2>Add Entity</h2> </div>
                <div slot="bread">
                    <form id="modal-form">
                        <input type="text" v-model="entity.name" placeholder="Name">
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
            <EntitiesEntity v-for="(o,i) in sortedEntitiesList" :key="i"
                :entity="o" 
                :entity_index="i"
            ></EntitiesEntity>
        </section>
    </div>
</template>

<script>
import { bus } from '../../root'
import EntitiesEntity from './EntitiesEntity.vue'
export default {
    props: [ 'entities' ],
    data () {
        return {
            entity: {
                name: ''
            },
            entityValidation: {
                name: true
            }
        }
    },
    computed: {
        sortedEntitiesList () { return this.mixinsSortList(this.entities) || null }
    },
    methods: {
        save () {
            const success = this.mixinsToggleModal(this.entity, this.entityValidation, 'entities')
            if (success) {
                this.entity.name = ''
            }
        }
    },
    components: {
        EntitiesEntity
    }
}
</script>

<style lang="css">
</style>
