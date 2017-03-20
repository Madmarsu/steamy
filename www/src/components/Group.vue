<template>
<div class="container">
        <div class="card blue-grey">
    <div id="chat">
      <p v-for="item in messages">
      {{item}}
      </p>
    </div>
    <form @submit.prevent="submitMessage">
      <input type="text" v-model="message">
      <input type="submit">
    </form>
  </div>
  </div>
</template>

<script>
  import store from '../store'
  export default {
    name: 'hello',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        message: '',
        user: {}
        //messages: []
      }
    },
    mounted(){
        store.actions.listenForMessage()
        console.log(store.state.messages)
    },
    methods: {
    
      submitMessage() {
        store.actions.emitMessage(this.message)
        this.message = ''
    },
    
  },
  computed: {
    messages(){
      console.log(store.state.messages)
      return store.state.messages
    }
  }
  }
  

</script>


<style scoped>
  #chat {
    height: 20vh
  }
</style>