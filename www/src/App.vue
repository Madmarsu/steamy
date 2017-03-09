<template>
  <div id="app">
    <navbar></navbar>
    <router-view></router-view>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
import Navbar from './components/NavBar'
import FooterBar from './components/FooterBar'
export default {
  name: 'app',
  components: {
    Navbar,
    FooterBar
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
