<template lang="html">
    <div id="home-resource-buy">
            <router-link :to="{ name: 'resource-details', query: { resource_id: resource._id } }">
                <strong>{{ resource.name }}</strong>
            </router-link>
            <span v-for="l in resource.locations">
                <span v-if="l.buy">
                    <span :title="l.name">{{ l.abbr }} </span>
                    <span>{{ l.buy }} </span>
                </span>
            </span>
    </div>
</template>

<script>
export default {
    props: [ 'resource' ]
}
</script>
