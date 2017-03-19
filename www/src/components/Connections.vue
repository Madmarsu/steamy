<template>
    <div>
        <div class="container">
            <div class="row">

                <div class="col s12">
                    <div class="card blue-grey">
                        <div class="card-content white-text">
                            <h3 class="center">My Connections</h3>
                            <p v-if="this.$root.$data.store.state.user.invites[0]">You've got new invites!</p>
                            <ul>
                                <li v-for="invite in this.$root.$data.store.state.user.invites"><router-link :to="'/profile/' + invite.userId">{{ invite.username }}</router-link> would like to be your friend! <button @click="acceptFriend(invite)" class="waves-effect waves-teal indigo btn">Accept</button> <button @click="declineFriend(invite)" class="waves-effect waves-teal indigo btn">Decline</button></li>
                            </ul>
                            <router-link to="/search" class="left waves-teal waves-effect indigo btn">Find Connections</router-link>
                            <router-link to="/creategroup" class="right waves-teal waves-effect indigo btn">Create Group</router-link>
                        </div>
                    </div>
                </div>

                <div class="col s6">
                    <div class="card blue-grey">
                        <div class="card-content white-text">
                            <h5 class="center">Friends</h5>
                            <p v-if="!this.$root.$data.store.state.user.friends[0]">You have no friends. SAD!</p>
                            <ul v-if="this.$root.$data.store.state.user.friends[0]">
                                <li v-for="friend in this.$root.$data.store.state.user.friends"><router-link :to="'/profile/' + friend._id">{{ friend.username }}</router-link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="col s6">
                    <div class="card blue-grey">
                        <div class="card-content white-text">
                            <h5 class="center">Groups</h5>
                            <p v-if="!this.$root.$data.store.state.user.groups[0]">You're in no groups. SAD!</p>
                            <table v-if="this.$root.$data.store.state.user.groups[0]" class="bordered">
                                <thead>
                                    <tr></tr>
                                </thead>
                                <tbody>
                                    <tr v-for="group in this.$root.$data.store.state.user.groups">
                                        <td>{{ group.game }}</td>
                                        <td>{{ group.title }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: 'connections',
        data(){
            return {

            }
        },
        mounted: function(){
            $(".dropdown-button").dropdown();
        },
        methods: {
            acceptFriend(invite){
                this.$root.$data.store.actions.acceptFriend(invite);
            },
            declineFriend(invite){
                this.$root.$data.store.actions.declineFriend(invite);
            }
        }
    }

</script>

<style>

</style>