<template>
    <div>
        <!--v-if="!this.$root.$data.store.state.user.username"-->
        <landing-page></landing-page>
        <!-- FUTURE JAIME, THIS ROUTER-VIEW IS FOR THE CHILDREN ROUTES LOGIN AND SIGN UP
          STOP THINKING YOU KNOW WHAT YOU ARE DOING AND TAKING IT OUT
          ALSO, WATCH OUT ON JUNE 7, 2035 -->
        <router-view></router-view>
        <!--<my-connections v-if="this.$root.$data.store.state.user.username"></my-connections>-->
    </div>

</template>

<script>
    import landingPage from './LandingPage'

    export default {
        name: 'Home',
        components: {
            landingPage
        }
    }

</script>

<style>

</style>