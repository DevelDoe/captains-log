<!--
@Author: Andree Ray <andreeray>
@Date:   2018-01-18T21:23:04+01:00
@Email:  andreeray@live.com
@Filename: App.vue
@Last modified by:   andreeray
@Last modified time: 2018-01-18T21:25:30+01:00
-->
<template>
    <div id="app">
        <header> <h1>Captains Log</h1> </header>
        <nav>
          <ul class="group">
            <li><router-link :to="{ name: 'home', params: {} }">home</router-link></li>
            <li><router-link :to="{ name: 'resources', params: {} }">resources</router-link></li>
            <li><router-link :to="{ name: 'locations', params: {} }">locations</router-link></li>
            <li><router-link :to="{ name: 'missions', params: {} }">missions</router-link></li>
            <li><router-link :to="{ name: 'characters', params: {} }">characters</router-link></li>
            <li><router-link :to="{ name: 'organisations', params: {} }">organisations</router-link></li>
          </ul>
        </nav>
        <router-view
            :resources="resources"
            :locations="locations"
            :location_types="location_types"
            :missions="missions"
            :characters="characters"
            :organisations="organisations"
            :meta_data="meta_data"
            :bus="bus" />
        <DevelToast :response="response"/>
    </div>
</template>

<script>
export default {
    props: [
        'resources',
        'locations',
        'location_types',
        'missions',
        'response',
        'organisations',
        'characters',
        'meta_data',
        'bus'
    ],
    data() {
        return {
            modal_header: 'Modal Header',
            modal_bread: 'Modal Bread',
            modal_footer: 'Modal footer'
        }
    }
}
</script>
