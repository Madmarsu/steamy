<template>
  <div class="container" v-cloak>
    <div class="row">
      <div class="card blue-grey">
        <div class="card-content white-text">
          <h4 class="left-align">{{user.username}}</h4>
          <div class="right-align">
            <a class="waves-effect waves-light btn" v-if="!isMyProfile && !isFriend">Add Friend</a>
            <a class="waves-effect waves-light btn" v-if="!isMyProfile && !isBlocked">Block</a>
            <a class="waves-effect waves-light btn" v-if="!isMyProfile && isBlocked">Remove Block</a>
          </div>
        </div>
      </div>
    </div>
    <div class="card blue-grey">
      <div class="container">
        <div class="row">
          <div class="col s6">
            <div>
            <img v-if="user.steamId" :src="user.avatar" class="avatar">
            <img v-if="!user.steamId" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=200%C3%97200&w=200&h=200" class="avatar">
            </div>
            <div>
              {{ user.bio }}
              <button v-if="this.$route.params.id == user._id">Edit Bio</button>
            </div>
          </div>
          <div class="col s6">
            <img v-if="!user.steamId" @click="linkSteam" src="https://steamcommunity-a.akamaihd.net/public/images/signinthroughsteam/sits_01.png"
              class="hoverable">
            <button class="waves-effect waves-teal btn indigo">Update Games</button>
            <ul>
              <li v-for="game in user.games">{{  }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="col s6">
      <div class="row">
        <!--<a  class="col s12 waves-effect waves-light btn" v-if="isComplete">Link Steam Account!</a>-->
        <router-link :to="{ name: 'profileEdit', params: { userId: 1 }}" class="col s12 waves-effect waves-light btn" v-if="isMyProfile">Edit Profile</router-link>
      </div>
    </div>
    <div class="row">
      <div class="col s4 offset-s1">
        <blockquote>
          <h2>About me!</h2>
          <p class="flow-text"> What a nice site this is!</p>
        </blockquote>
      </div>
      <div class="col s6 offset-s1">
        <h2> My Games!</h2>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
  export default {
    name: 'profile-mainPage',
    data() {
      return {
        userId: "",

      }
    },
    computed: {
      isMyProfile() {
        return true
      },
      user() {
        return this.$root.$data.store.state.user;
      },
      isComplete() {
        // Do to find a way to rend a client steamid from the session 
        return this.isMyProfile // && !steamid
      },
      isFriend() {
        return false
      },
      isBlocked() {
        return false
      }
    },
    mounted() {
    },
    methods: {
      linkSteam() {
        this.$root.$data.store.actions.linkSteam();
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
  
  [v-cloak] {
    display: none;
  }
  
  [profileButton] {}
</style>