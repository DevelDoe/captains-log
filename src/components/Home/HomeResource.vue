<template lang="html">
    <div id="home-resource">
        <router-link :to="{ name: 'resource-details', query: { resource_id: resource._id } }">
        </router-link>
    </div>
</template>

<script>
export default {
    props: [ 'locations', 'resource' ],
    computed: {
        comLocations() {
            let res = []
            this.locations.forEach(location => {
                location.resources.forEach(resource => {
                    if( resource.resource_id === this.resource._id) {
                        var splitStr = location.name.toLowerCase().split(' ')
                        for (var i = 0; i < splitStr.length; i++) {
                            var isnum = /^\d+$/.test(splitStr[i])
                            if(isnum) splitStr[i] = splitStr[i]
                            else splitStr[i] = splitStr[i].charAt(0).toUpperCase()
                        }
                        res.push( { location: splitStr.join(''), sell: resource.sell})
                    }
                })

            })
            return res.sort((a, b) => parseFloat(a.sell) - parseFloat(b.sell))
        },
    }
}
</script>

<style lang="css">
</style>
