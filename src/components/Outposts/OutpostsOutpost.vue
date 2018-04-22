<template lang="html">
    <div id="outpost" >
        <router-link :to="{ name: 'outpost-details', query: { outpost_id: outpost._id, outpost_index: index }}">
            <h4>{{ outpost.name }}</h4>
        </router-link>
    </div>
</template>

<script>
export default {
    props: [ 'outpost', 'index' ]
}
</script>
