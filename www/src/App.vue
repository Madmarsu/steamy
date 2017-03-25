<template>
  <div id="app">
    <keep-alive>
      <navbar></navbar>
    </keep-alive>
    <main>
      <router-view></router-view>
    </main>
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
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }
  
  body {
    background: url('http://unsplash.com/photos/CuFYW1c97w8/download?force=true');
    background-position: fixed;
    background-size: cover;
  }
  
  main {
    flex: 1 0 auto;
  }
  
  .footer-icon {
    font-size: 24px;
    margin-bottom: 7px;
  }
  
  .input-field label {
    color: #cfcfcf;
  }
  
  .input-field input[type=text]:focus+label {
    color: #b4b0ff;
  }
  
  .input-field input[type=text]:focus {
    border-bottom: 1px solid #b4b0ff;
    box-shadow: 0 1px 0 0 #b4b0ff;
  }
  
  .input-field input[type=password]:focus+label {
    color: #b4b0ff;
  }
  
  .input-field input[type=password]:focus {
    border-bottom: 1px solid #b4b0ff;
    box-shadow: 0 1px 0 0 #b4b0ff;
  }

  textarea.materialize-textarea:focus:not([readonly])+label {
    color: #b4b0ff;
  }
  
  textarea.materialize-textarea:focus:not([readonly]) {
    border-bottom: 1px solid #b4b0ff;
    box-shadow: 0 1px 0 0 #b4b0ff;
  }
  
  .page-link {
    font-weight: bold;
    color: #283593;
  }
  
  .page-link:hover {
    color: white;
  }
</style>