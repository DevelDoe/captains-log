<template lang="html">
    <div id="missions-mission">
        <router-link :to="{ name: 'Mission', query: { mission_id: mission._id, mission_index: index} }">
            <h4> {{ mission.name }}</h4>
        </router-link>
    </div>
</template>

<script>
export default {
    props: [ 'mission', 'index']
}
</script>
