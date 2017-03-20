<template>
  <div>
    <div class="container">
      <div class="card blue-grey">
        <div class="card-content white-text">
          <h5>Chatting with { username }</h5>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="card blue-grey">
        <div id="chat">
          <p v-for="item in messages">
            {{ item }}
          </p>
        </div>
        <form @submit.prevent="submitMessage" class="row">
          <div class="input-field col s10">
            <input type="text" v-model="message" class="chatbox">
          </div>
          <div class="input-field center col s2">
            <button type="submit" class="waves-effect waves-teal btn indigo" id="submit-button">SEND</button>
          </div>
        </form>
      </div>


    </div>
    <!--<div class="col s2">
        <div class="card blue-grey">
          <div class="card-content white-text">
            <h5>Online</h5>
          </div>
        </div>
      </div>-->


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
    mounted() {
      store.actions.listenForMessage()
      console.log(store.state.messages)
    },
    methods: {

      submitMessage() {
        store.actions.emitMessage(this.message)
        this.message = ''
        setTimeout(function(){
          var objDiv = document.getElementById("chat");
          objDiv.scrollTop = objDiv.scrollHeight;
        }, 500);
      },

    },
    computed: {
      messages() {
        console.log(store.state.messages)
        return store.state.messages
      }
    }
  }

</script>


<style scoped>
  #chat {
    height: 45vh;
    padding-left: 1%;
    padding-right: 1%;
    overflow: auto;
    color: white;
  }
  
  .chatbox {
    background-color: white;
    padding-left: 1%;
    padding-right: 1%;
    margin-left: 2%;
    border: 2px solid #3f51b5;
  }
  
  #submit-button {
    margin-top: 2%;
  }
  
  strong {
    font-weight: bold;
    color: #283593;
  }
  
  blockquote {
    border-left: 5px solid #283593;
  }
</style>