<template lang="html">
    <div id="missions-mission">
        <router-link :to="{ name: 'mission-details', query: { id: mission._id, index: index} }">
            <h4> {{ mission.name }}</h4>
        </router-link>
    </div>
</template>

<script>
export default {
    props: [ 'mission', 'index']
}
</script>
