<template>
  <div class="container" v-cloak>
    <div class="row">
      <div class="card blue-grey">
        <div class="card-content white-text">
          <h4 class="left-align">{{user.username}}</h4>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col s12 m12 l9">
        <div class="card blue-grey">
          <div class="card-content white-text">
            <div class="row">
              <div class="col s12 m6 l6">
                <div class="center">
                  <img v-if="user.steamId" :src="user.avatar" class="avatar">
                  <img v-if="!user.steamId" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=200%C3%97200&w=200&h=200" class="avatar">
                </div>
                <div>
                  <button @click="toggleEditBio" class="waves-effect waves-teal btn-floating indigo"><i v-if="!showEditBio" class="fa fa-pencil"></i><i v-if="showEditBio" class="fa fa-times"></i></button>                  {{ user.bio }}
                  <div v-if="showEditBio">
                    <h4>Edit Bio</h4>
                    <form class="row" @submit.prevent="updateBio">
                      <div class="col s12 input-field">
                        <textarea class="materialize-textarea" cols="30" rows="10" v-model="editBio"></textarea>
                      </div>
                      <button class="waves-effect waves-teal btn indigo" type="submit">Update Bio</button>
                    </form>
                  </div>
                </div>
              </div>
              <div class="col s12 m6">
                <div class="center">
                  <img @click="linkSteam" src="https://steamcommunity-a.akamaihd.net/public/images/signinthroughsteam/sits_01.png" class="hoverable" v-if="!linkedSteam">
                  <a class="waves-effect waves-light btn indigo" @click="updateGames" v-if="linkedSteam">Update Games</a>
                  <!-- <p v-if="user.steamId"><sup>*To update your avatar or your games library, simply sign in through Steam again.</sup></p> -->
                  <h5>{{ user.username }}'s Games</h5>
                </div>
                <div class="scrollable">
                  <ul>
                    <li v-for="game in user.games">
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
      </div>
      <div class="row">
      <div class="col s12 m6 l3">
        <div class="card blue-grey">
          <div class="card-content white-text">
            <h5 class="center">Friends</h5>
            <p v-if="!user.friends[0]">No friends yet, go get some!</p>
            <ul v-if="user.friends[0]">
              <li v-for="friend in user.friends">
                <router-link class="page-link" :to="'/profile/' + friend._id">{{ friend.username }}</router-link>
              </li>
            </ul>
          </div>
    </div>
        </div>
    <div class="col s12 m6 l3">
        <div class="card blue-grey">
          <div class="card-content white-text">
            <h5 class="center">Groups</h5>
            <p v-if="!this.$root.$data.store.state.user.groups[0]">No groups yet. Find groups matching games in your profile, or make your own!</p>
            <ul v-if="this.$root.$data.store.state.user.groups[0]" class="bordered">
              <!--<thead>
                <tr></tr>
              </thead>-->
              <tbody>
                <li v-for="group in this.$root.$data.store.state.user.groups">
                  <td>
                    <router-link class="page-link" :to="'/group/' + group._id">{{ group.title }}</router-link>
                  </td>
                  <!--<td>{{ group.game }}</td>-->
                </li>
              </tbody>
            </ul>
          </div>
        </div>
      </div>
    </div>
      </div>
  </div>
</template>

<script>
  export default {
    name: 'my-profile',
    data() {
      return {
        userId: "",
        showEditBio: false,
        editBio: ''

      }
    },
    computed: {
      user() {
        return this.$root.$data.store.state.user;
      },
      linkedSteam() {
        return this.$root.$data.store.state.user.steamId;
      }
    },
    mounted() {
      $(".dropdown-button").dropdown();
    },
    methods: {
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