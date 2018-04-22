<template>
    <div id="location">
        <router-link :to="{ name: type, query: { location_id: location._id, location_index: index } }">
            <h4>{{ location.name }}</h4>
        </router-link>
    </div>
</template>

<script>
export default {
    props: [ 'location', 'index' , 'type']
}
</script>
