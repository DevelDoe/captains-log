<template lang="html">
    <div id="locations-location-outpost">

        <router-link :to="{ name: 'outpost_details', query: { outpost_id: outpost._id } }">
            {{ outpost.name }}
        </router-link>

    </div>
</template>

<script>
export default {
    props: [ 'outpost' ]
}
</script>
