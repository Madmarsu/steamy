<template>
    <div>
        <div class="container">
            <div class="row">

                <div class="col s12">
                    <div class="card blue-grey">
                        <div class="card-content white-text">
                            <h3 class="center">My Connections</h3>
                            <p v-if="this.$root.$data.store.state.user.invites[0]">You've got new invites!</p>
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
                                <li v-for="friend in this.$root.$data.store.state.user.friends">{{ friend.username }}</li>
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
                                        <td>{{ group.name }}</td>
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
        }
    }

</script>

<style>

</style>