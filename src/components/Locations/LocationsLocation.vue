<template>
    <div id="location">
        <router-link :to="{ name: type, query: { location_id: location._id, location_index: index } }">
            <span>{{ location.name }}</span> - <span>{{ location.type }}</span>
        </router-link>
    </div>
</template>

<script>
export default {
    props: [ 'location', 'index' , 'type']
}
</script>
