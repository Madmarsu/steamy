<template>
    <div>
<landing-page></landing-page>
<router-view></router-view>

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