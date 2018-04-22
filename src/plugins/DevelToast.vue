<!-- <DevelToast :response="response"/> -->
<template lang="html">
    <transition name="slide-fade" :duration="{ enter: 500, leave: 800 }" >
    <section id="toast" v-if="response">
        {{ response }}
    </section>
    </transition>
</template>

<script>
export default {
    name: 'DevelToast',
    props: [ 'response' ]
}
</script>
