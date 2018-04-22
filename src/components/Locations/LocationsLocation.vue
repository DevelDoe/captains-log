<template>
    <div id="location">
        <router-link :to="{ name: 'location-details', query: { location_id: location._id, location_index: index } }">
            <h4>{{ location.name }}</h4>
            <h5>{{ location.type }}</h5>
        </router-link>
    </div>
</template>

<script>
export default {
    props: [ 'location', 'index' ]
}
</script>
