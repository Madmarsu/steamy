<template>
  <div>
    <div class="container">
      <div class="card blue-grey">
        <div class="card-content white-text">
          <h5>{{ group.title }}</h5>
          <blockquote>{{ group.description }}</blockquote>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="container">
        <div class="col s10">
          <div class="card blue-grey">
            <div id="chat">
              <p v-for="item in messages">
                <strong>{{ item.username }}:</strong> {{ item.message }}
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
        <div class="col s2">
          <div class="card blue-grey">
            <div class="card-content white-text">
              <h5>Members</h5>
              <ul>
                <li v-for="member in group.members">{{ member.username }}</li>
              </ul>
            </div>
          </div>
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
        user: {},
        group: {
          title: 'you died',
          game: 'DARK SOULS III',
          description: 'lol',
          members: [{
            username: 'freckles',
            _id: '155166451'
          }]
        },
        messages: [{
          username: 'freckles',
          message: 'you suck at dark souls'
        },{
          username: 'testing',
          message: 'hey i\'m actually really good'
        },{
          username: 'testing123',
          message: 'i just died'
        },{
          username: 'jason',
          message: 'dark souuuuuuuls'
        },{
          username: 'jaime',
          message: 'praise the sun'
        }]
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