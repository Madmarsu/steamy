<template>
    <div>
        <landing-page v-if="!this.$root.$data.store.state.user._id"></landing-page>
        <!-- FUTURE JAIME, THIS ROUTER-VIEW IS FOR THE CHILDREN ROUTES LOGIN AND SIGN UP
          STOP THINKING YOU KNOW WHAT YOU ARE DOING AND TAKING IT OUT
          ALSO, WATCH OUT ON JUNE 7, 2035 -->
        <router-view></router-view>
        <connections v-if="this.$root.$data.store.state.user._id"></connections>
    </div>

</template>

<script>
    import landingPage from './LandingPage'
    import connections from './Connections'

    export default {
        name: 'Home',
        components: {
            landingPage,
            connections
        }
    }

</script>

<style>

</style>