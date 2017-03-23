<template>
  <div>
    <div class="container">
      <div class="card blue-grey">
        <div class="card-content white-text">
          <h5>{{ this.$root.$data.store.state.activeGroup.title }}</h5>
          <blockquote>{{ this.$root.$data.store.state.activeGroup.description }}</blockquote>
          <div class="right-align">
            <button class="waves-effect waves-teal btn indigo" @click="leaveGroup">Leave Group</button>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="container">
        <div class="col s10">
          <div class="card blue-grey">
            <div id="chat">
              <p v-for="message in this.$root.$data.store.state.activeGroup.chatHistory">
                <strong>{{ message.username }}:</strong> {{ message.content }}
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
                <li v-for="member in this.$root.$data.store.state.activeGroup.members">{{ member.username }}</li>
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
    sockets: {
      groupMessageAdded(){
        this.$root.$data.store.actions.setActiveGroup(this.$route.params.id);
      }
    },
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        message: ''
      }
    },
    mounted() {
      this.$root.$data.store.actions.setActiveGroup(this.$route.params.id);
    },
    methods: {
      submitMessage() {
        let message = {
          username: this.$root.$data.store.state.user.username,
          message: this.message
        }
        this.$root.$data.store.actions.sendGroupMessage(message, this.$route.params.id);
        this.message = ''
      },
      leaveGroup() {
        let vue = this;
        this.$root.$data.store.actions.leaveGroup(this.$route.params.id);
        setTimeout(function () {
          vue.$router.push({ path: '/' })
        }, 500);
      }
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