<template lang="html">
    <div :class="locationsFltrClass" @click="filter">
        <span class="checkbox"></span>
        <span> {{ location.type }}</span>
    </div>
</template>

<script>
export default {
    props: [ 'location' ],
    data() {
        return {
            checked: false
        }
    },
    methods: {
        filter() {
            this.checked = !this.checked
            bus.$emit
        }
    }
}
</script>

<style lang="css">
</style>
