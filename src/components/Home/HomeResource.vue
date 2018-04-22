<template lang="html">
    <div id="home-resource">
        <router-link :to="{ name: 'resource-details', query: { resource_id: resource._id } }">
            {{ resource.name }}: <span v-for="( o, i ) in prices">{{ o.location }}: {{ o.price }} </span>
        </router-link>
    </div>
</template>

<script>
export default {
    props: [ 'locations', 'resource' ],
    computed: {
        prices() {
            let prices = []
            this.locations.forEach(location => {
                location.resources.forEach(resource => {
                    if( resource.resource_id === this.resource._id) {
                        prices.push( { location: location.name, price: resource.price})
                    }
                })

            })
            return prices.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
        }
    }
}
</script>

<style lang="css">
</style>
