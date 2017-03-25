<template>
  <div>
    <div class="container">
      <div class="card blue-grey">
        <div class="card-content white-text">
          <div v-for="member in this.$root.$data.store.state.activeChat.members">
            <h5 v-if="user._id != member._id">Chatting with {{ member.username }}</h5>

          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="card blue-grey">
        <div id="chat">
          <div v-for="message in this.$root.$data.store.state.activeChat.chatHistory">
            <p v-if="message.userId == user._id" class="right-align">
              <strong><router-link class="page-link" :to="'/profile/' + message.userId">{{ message.username }}</router-link>:</strong> {{ message.content
              }}
            </p>
            <p v-if="message.userId != user._id">
              <strong><router-link class="page-link" :to="'/profile/' + message.userId">{{ message.username }}</router-link>:</strong> {{ message.content
              }}
            </p>
          </div>
        </div>
        <form @submit.prevent="submitMessage" class="row">
          <div class="input-field col s11 m9">
            <input type="text" v-model="message" class="chatbox">
          </div>
          <div class="input-field center col s12 m2 submit-btn">
            <button type="submit" class="waves-effect waves-teal btn indigo" id="submit-button">SEND</button>
          </div>
        </form>
      </div>


    </div>


  </div>
</template>

<script>
  import store from '../store'
  export default {
    name: 'hello',
    sockets: {
      chatMessageAdded() {
        this.$root.$data.store.actions.setActiveChat(this.$route.params.id);
        setTimeout(function () {
          var objDiv = document.getElementById("chat");
          objDiv.scrollTop = objDiv.scrollHeight;
        }, 500);
      }
    },
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        message: ''
      }
    },
    computed: {
      user() {
        return this.$root.$data.store.state.user;
      }
    },
    mounted() {
      this.$root.$data.store.actions.setActiveChat(this.$route.params.id);
    },
    methods: {
      submitMessage() {
        let message = {
          username: this.$root.$data.store.state.user.username,
          message: this.message
        }
        this.$root.$data.store.actions.sendChatMessage(message, this.$route.params.id);
        this.message = ''
        setTimeout(function () {
          var objDiv = document.getElementById("chat");
          objDiv.scrollTop = objDiv.scrollHeight;
        }, 500);
      },

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

  .submit-btn {
    margin-bottom: 5%;
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