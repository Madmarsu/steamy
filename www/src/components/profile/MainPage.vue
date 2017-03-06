<template>
  <div v-cloak>
    <div class="row">
      <div class="col s12"><span class="flow-text">{{user.username}}'s Profile Page</span></div>
    </div>
    <div class="row">
      <div class="col s12">
        <img :src="user.avatar" alt="https://placeholdit.imgix.net/~text?txtsize=33&txt=200%C3%97200&w=200&h=200" class="circle responsive-img">
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
      user: {}
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
</style>
