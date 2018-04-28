<template lang="html">
    <div id='users'>
        <ul>
            <li v-for="user in users">
                {{ user.name }}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: [ 'users' ]
}
</script>

<style lang="css">
</style>
