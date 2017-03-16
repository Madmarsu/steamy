<template>
  <div class="container" v-cloak>
    <div class="row">
      <div class="col s12"><span class="flow-text">{{user.username}}'s Profile Page</span></div>
    </div>
    <div class="row">
      <div class="col s6">
        <img :src="user.avatar" alt="https://placeholdit.imgix.net/~text?txtsize=33&txt=200%C3%97200&w=200&h=200" class="circle responsive-img">
      </div>
      <div class="col s6" >
        <div class="row">
          <a  class="col s12 waves-effect waves-light btn" v-if="isComplete">Link Steam Account!</a>
          <router-link :to="{ name: 'profileEdit', params: { userId: 1 }}" class="col s12 waves-effect waves-light btn" v-if="isMyProfile" >Edit Profile</router-link>
           <a class="col s12 waves-effect waves-light btn" v-if="!isMyProfile && !isFriend">Add Friend</a>
           <a class="col s12 waves-effect waves-light btn" v-if="!isMyProfile && !isBlocked">Block</a>
           <a class="col s12 waves-effect waves-light btn" v-if="!isMyProfile && isBlocked">Remove Block</a>
        </div>
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
</template>

<script>
export default {
  name: 'profile-mainPage',
  data () {
    return {
      userId: "",
      user: {},
      
    }
  },
  computed:{
    isMyProfile() {
      return true
    },
    isComplete() {
      // Do to find a way to rend a client steamid from the session 
      return this.isMyProfile // && !steamid
    },
    isFriend(){
      return false
    },
    isBlocked(){
      return false
    }
  },
  mounted(){
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
[v-cloak] {
  display: none;
}
[profileButton]{
}
</style>