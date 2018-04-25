<template lang="html">
    <div :class="locationsFltrClass" @click="filter">
        <span class="checkbox"></span>
        <span> {{ location }}</span>
    </div>
</template>

<script>
export default {
    props: [ 'location' ],
    data() {
        return {
            checked: this.location === 'Moon' || this.location === 'Station' || false
        }
    },
    methods: {
        filter() {
            this.checked = !this.checked
            this.$bus.$emit('filter', 'filterLocations', this.location, this.checked)
        }
    },
    computed: {
        locationsFltrClass() {
            return {
                'location-filter': true,
                'active': this.checked
            }
        },
    }
}
</script>

<style lang="css">
    .check-filter {
        cursor: pointer;
    }
    .checkbox {
        display: inline-block;
        position: relative;
        width: 20px;
        height: 20px;
        border: 1px solid white;
        border-radius: 2px;
        user-select: none;
    }
    .active .checkbox::after {
        content: '';
    border-color: white;
    background-color: white;
    position: absolute;
    width: 15px;
    height: 14px;
    left: 1px;
    top: 2px;
    border-radius: 2px;
    }
</style>
