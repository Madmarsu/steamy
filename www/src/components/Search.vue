<template>
    <div class="container">
        <div class="card blue-grey">
            <div class="card-content white-text">
                <h4 class="center">Search</h4>
                <ul class="pagination">
                    <li :class="{ active: showGames, 'waves-effect': showUsername || showGroup }"><a @click="activateGames">Search by Game</a></li>
                    <li :class="{ active: showUsername, 'waves-effect': showGames || showGroup }"><a @click="activateUsername">Search by Username</a></li>
                    <li :class="{ active: showGroup, 'waves-effect': showGames || showUsername }"><a @click="activateGroup">Search by Group Title</a></li>
                </ul>
                <form v-show="showGames" @submit.prevent="search">
                    <div class="input-field">
                        <select id="selectedGame">
                            <option v-for="game in this.$root.$data.store.state.user.games" :value="game.name">{{ game.name }}</option>
                        </select>
                        <label>Game</label>
                    </div>
                    <div class="input-field">
                        <select id="selectedConnect">
                            <option value="group">Group</option>
                            <option value="individual">Individual</option>
                        </select>
                        <label>Search Type</label>
                    </div>
                    <div class="input-field center">
                        <button class="waves-effect waves-teal btn indigo" type="submit">Search</button>
                    </div>
                </form>
                <form v-show="showUsername" @submit.prevent="searchByUsername">
                    <div class="input-field">
                        <input id="username" type="text" v-model="username">
                        <label for="username">Username</label>
                    </div>
                    <div class="input-field center">
                        <button class="waves-effect waves-teal btn indigo" type="submit">Search</button>
                    </div>
                </form>
                <form v-show="showGroup" @submit.prevent="searchByGroupTitle">
                    <div class="input-field">
                        <input id="grouptitle" type="text" v-model="groupTitle">
                        <label for="gouptitle">Group Title</label>
                    </div>
                    <div class="input-field center">
                        <button class="waves-effect waves-teal btn indigo" type="submit">Search</button>
                    </div>
                </form>
            </div>
        </div>

        <div v-if="userResults[0]" class="card blue-grey">
            <div class="card-content white-text">
                <div class="left">
                    <h5>Results</h5>
                </div>
                <div class="right"><button @click="resetSearch" class="waves-effect waves-teal btn indigo">Reset</button></div>
                <table class="bordered">
                    <thead>
                        <tr class="center"></tr>
                    </thead>
                    <tbody>
                        <tr v-for="userResult in userResults" v-if="user._id !== userResult._id">
                            <td><img :src="userResult.avatar" class="avatar"></td>
                            <td>{{ userResult.username }}</td>
                            <td>
                                <router-link class="waves-effect waves-teal btn indigo" :to="'/profile/' + userResult._id">View Profile</router-link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div v-if="groupResults[0]" class="card blue-grey">
            <div class="card-content white-text">
                <div class="left">
                    <h5>Results</h5>
                </div>
                <div class="right"><button @click="resetSearch" class="waves-effect waves-teal btn indigo">Reset</button></div>
                <table class="bordered">
                    <thead>
                        <tr class="center"></tr>
                    </thead>
                    <tbody>
                        <tr v-for="groupResult in groupResults" v-if="groupResult.members.length != 0">
                            <td><strong>{{ groupResult.title }}</strong></td>
                            <td>{{ groupResult.description }}</td>
                            <td>{{ groupResult.members.length }} Members</td>
                            <td><button @click="joinGroup(groupResult)" class="waves-effect waves-teal btn indigo">Join Group</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'search',
        data() {
            return {
                username: '',
                title: '',
                description: '',
                showGames: true,
                showUsername: false,
                showGroup: false,
                groupTitle: ''
            }
        },
        computed: {
            user() {
                return this.$root.$data.store.state.user;
            },
            userResults() {
                return this.$root.$data.store.state.userResults;
            },
            groupResults() {
                return this.$root.$data.store.state.groupResults;
            }
        },
        mounted: function () {
            $('select').material_select();
            // if (!this.$root.$data.store.state.user.steamId) {
            //     this.$router.push({ path: '/myprofile' })
            //     Materialize.toast('Please link your Steam account.', 1000);
            // }
        },
        methods: {
            search() {
                var selectedConnect = document.getElementById('selectedConnect');
                console.log(selectedConnect.value);
                var selectedGame = document.getElementById('selectedGame');
                console.log(selectedGame.value);
                if (selectedConnect.value == 'group') {
                    this.$root.$data.store.actions.searchGroups(selectedGame.value);
                } else if (selectedConnect.value == 'individual') {
                    this.$root.$data.store.actions.searchIndividual(selectedGame.value);
                }
            },
            resetSearch() {
                this.$root.$data.store.actions.clearSearch();
            },
            joinGroup(group) {
                let vue = this;
                this.$root.$data.store.actions.joinGroup(group);
                setTimeout(function () {
                    vue.$router.push({ path: '/group/' + group._id });
                }, 500);
            },
            activateGames() {
                this.showGames = true
                this.showUsername = false
                this.showGroup = false
            },
            activateUsername() {
                this.showUsername = true
                this.showGames = false
                this.showGroup = false
            },
            activateGroup() {
                this.showGroup = true
                this.showUsername = false
                this.showGames = false
            },
            searchByUsername() {
                if (this.username == '') {
                    Materialize.toast('Please enter a username!', 1000)
                } else {
                    this.$root.$data.store.actions.searchByUsername(this.username)
                }
            },
            searchByGroupTitle(){
                if(this.groupTitle == ''){
                    Materialize.toast('Please enter a group title to search!', 1000);
                } else {
                    this.$root.$data.store.actions.searchByGroupTitle(this.groupTitle);
                }
            }
        }
    }

</script>

<style>
    .pagination li.active {
        background: #283593;
    }
    
    .pagination li a {
        color: white;
        font-size: 14px;
    }
    
    .avatar {
        width: 50px;
        height: 50px;
    }
    
    strong {
        font-weight: bold;
    }
</style>