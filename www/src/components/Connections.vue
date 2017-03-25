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
                                <li v-for="invite in this.$root.$data.store.state.user.invites">
                                    <router-link class="page-link" :to="'/profile/' + invite.userId">{{ invite.username }}</router-link> would like to be your friend! <button @click="acceptFriend(invite)"
                                        class="waves-effect waves-teal indigo btn">Accept</button> <button @click="declineFriend(invite)"
                                        class="waves-effect waves-teal indigo btn">Decline</button></li>
                            </ul>
                            <!--<div class="center">-->
                                <router-link to="/search" class="waves-teal waves-effect indigo btn left">Find Connections</router-link>
                                <router-link to="/creategroup" class="waves-teal waves-effect indigo btn right">Create Group</router-link>
                            <!--</div>-->
                        </div>
                    </div>
                </div>

                <div class="col s12 m7">
                    <div class="card blue-grey">
                        <div class="card-content white-text">
                            <h5 class="center">Friends</h5>
                            <p v-if="!this.$root.$data.store.state.user.friends[0]">You have no friends. Go make some friends!</p>
                            <table v-if="this.$root.$data.store.state.user.friends[0]" class="bordered">
                                <thead>
                                    <tr></tr>
                                </thead>
                                <tbody>
                                    <tr v-for="friend in this.$root.$data.store.state.user.friends">
                                        <td><img :src="friend.avatar" class="avatar"></td>
                                        <td>
                                            <router-link class="page-link" :to="'/profile/' + friend._id">{{ friend.username }}</router-link>
                                        </td>
                                        <td><a class="waves-effect waves-light btn indigo" @click="createChat(friend._id)">Send Message</a></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div class="col s12 m5">
                    <div class="card blue-grey">
                        <div class="card-content white-text">
                            <h5 class="center">Groups</h5>
                            <p v-if="!this.$root.$data.store.state.user.groups[0]">You're in no groups. Go join some groups!</p>
                            <table v-if="this.$root.$data.store.state.user.groups[0]" class="bordered">
                                <thead>
                                    <tr></tr>
                                </thead>
                                <tbody>
                                    <tr v-for="group in this.$root.$data.store.state.user.groups">
                                        <td>
                                            <router-link class="page-link" :to="'/group/' + group._id">{{ group.title }}</router-link>
                                        </td>
                                        <td>{{ group.game }}</td>
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
        data() {
            return {

            }
        },
        mounted() {
            let vue = this;
            $(".dropdown-button").dropdown();
            this.$root.$data.store.actions.checkLoggedIn();
            // setTimeout(function () {
            //     if (!vue.$root.$data.store.state.user.steamId) {
            //         vue.$router.push({ path: '/myprofile' })
            //         Materialize.toast('Please link your Steam account.', 1000);
            //     }
            // }, 500);
        },
        methods: {
            acceptFriend(invite) {
                this.$root.$data.store.actions.acceptFriend(invite);
            },
            declineFriend(invite) {
                this.$root.$data.store.actions.declineFriend(invite);
            },
            createChat(friendId) {
                this.$root.$data.store.actions.createChat(friendId);
            }
        }
    }

</script>

<style>
    .avatar {
        width: 50px;
        height: 50px;
    }
</style>