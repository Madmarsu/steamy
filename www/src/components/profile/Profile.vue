<template>
  <div class="container" v-cloak>
    <div class="row">
      <div class="card blue-grey">
        <div class="card-content white-text">
          <h4 class="left-align">{{ activeProfile.username }}</h4>
          <div class="right-align">
            <a class="waves-effect waves-light btn indigo top-bot-marg" @click="addFriend" v-if="!isFriend">Add Friend</a>
            <a class="waves-effect waves-light btn indigo top-bot-marg" @click="createChat" v-if="isFriend">Send Message</a>
            <a class="waves-effect waves-light btn indigo top-bot-marg" @click="toggleAddGroup" v-if="isFriend"><span v-if="!addGroup">Add to Group</span><span v-if="addGroup">Close Form</span></a>
            <a class="waves-effect waves-light btn indigo top-bot-marg" @click="removeFriend" v-if="isFriend">Remove</a>
            <a class="waves-effect waves-light btn indigo top-bot-marg" @click="block" v-if="!isBlocked">Block</a>
            <a class="waves-effect waves-light btn indigo top-bot-marg" @click="unblock" v-if="isBlocked">Remove Block</a>
          </div>
          <div v-show="addGroup">
            <form @submit.prevent="addToGroup">
              <select id="selected">
                <option v-for="group in this.$root.$data.store.state.user.groups" :value="group._id">{{ group.title }}</option>
              </select>
              <button class="waves-effect waves-teal btn indigo" type="submit">Add to Group</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="card blue-grey">
      <div class="card-content white-text">
        <div class="row">
          <div class="col s12 m6">
            <div>
              <img v-if="activeProfile.avatar" :src="activeProfile.avatar" class="avatar">
              <img v-if="!activeProfile.avatar" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=200%C3%97200&w=200&h=200" class="avatar">
            </div>
            <div>
              {{ activeProfile.bio }}
            </div>
          </div>
          <div class="col s12 m6">
            <h5>{{ activeProfile.username }}'s Games</h5>
            <div class="scrollable">
              <ul>
                <li v-for="game in activeProfile.games">
                  <div class="flex-container">
                    <img :src="'http://media.steampowered.com/steamcommunity/public/images/apps/' + game.appid + '/' + game.img_icon_url + '.jpg'">
                    <span class="game-title">{{ game.name }}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--<div class="col s6">
      <div class="row">
      </div>
    </div>-->
  </div>
</template>

<script>
  export default {
    name: 'profile',
    data() {
      return {
        userId: "",
        addGroup: false
      }
    },
    computed: {
      activeProfile() {
        return this.$root.$data.store.state.activeProfile;
      },
      isFriend() {
        let user = this.$root.$data.store.state.user;
        let activeProfile = this.$root.$data.store.state.activeProfile;
        let exists;
        if (user.friends) {
          user.friends.forEach(friend => {
            if (friend._id == activeProfile._id) {
              exists = true
            }
          })
          if (exists) {
            return true
          } else {
            return false
          }
        }
      },
      isBlocked() {
        let user = this.$root.$data.store.state.user;
        if (!user) {
          return false
        }

        if (!user.blocked) {
          return false
        }
        console.log(user)
        return user.blocked.indexOf(this.activeProfile._id) > -1
      }
    },
    mounted() {
      $('select').material_select();
      this.$root.$data.store.actions.setActiveProfile(this.$route.params.id);
    },
    methods: {
      addToGroup(){
        var select = document.getElementById('selected');
        console.log(select.value);
        this.$root.$data.store.actions.addToGroup(select.value, this.$route.params.id);
        this.addGroup = !this.addGroup;
      },
      removeFriend() {
        this.$root.$data.store.actions.removeFriend(this.$route.params.id);
      },
      toggleAddGroup() {
        this.addGroup = !this.addGroup;
        $('select').material_select();
      },
      addFriend() {
        this.$root.$data.store.actions.addFriend(this.$route.params.id);
      },
      linkSteam() {
        this.$root.$data.store.actions.linkSteam();
      },
      updateGames() {
        this.$root.$data.store.actions.updateGames();
      },
      toggleEditBio() {
        this.showEditBio = !this.showEditBio;
        this.editBio = this.user.bio;
      },
      updateBio() {
        this.$root.$data.store.actions.updateBio({
          bio: this.editBio
        })
        this.showEditBio = false;
      },
      createChat() {
        this.$root.$data.store.actions.createChat(this.$route.params.id);
      },
      block() {
        this.$root.$data.store.actions.blockUser(this.$route.params.id);
      },
      unblock() {
        this.$root.$data.store.actions.unBlockUser(this.$route.params.id);
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .avatar {
    width: 200px;
    height: 200px;
    border-radius: 5%;
    margin: 10px;
  }
  
  .top-bot-marg {
    margin-top: 2%;
    margin-bottom: 2%;
  }
  
  .flex-container {
    display: flex;
    align-items: center;
    padding-top: 3px;
    padding-bottom: 3px;
  }
  
  .game-title {
    padding-left: 3px;
  }
  
  .scrollable {
    max-height: 400px;
    overflow: auto;
  }
  
  [v-cloak] {
    display: none;
  }
  
  [profileButton] {}
</style>