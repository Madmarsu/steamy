<template>
    <div class="container">
        <div class="card blue-grey">
            <form @submit.prevent="search">
                <div class="card-content white-text">
                    <h4 class="center">Search</h4>
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
                </div>
            </form>
        </div>

        <div v-if="userResults[0]" class="card blue-grey">
            <div class="card-content white-text">
                <div class="left">
                    <h5>Results</h5>
                </div>
                <div class="right"><button class="waves-effect waves-teal btn indigo">Reset</button></div>
                <table class="bordered">
                    <thead>
                        <tr class="center"></tr>
                    </thead>
                    <tbody>
                        <tr v-for="userResult in userResults">
                            <td><img :src="userResult.avatar" class="avatar"></td>
                            <td>{{ userResult.username }}</td>
                            <td><router-link class="waves-effect waves-teal btn indigo" :to="'/profile/' + userResult._id">View Profile</router-link></td>
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
                        <tr v-for="groupResult in groupResults">
                            <td><strong>{{ groupResult.title }}</strong></td>
                            <td>{{ groupResult.description }}</td>
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
                title: '',
                description: ''
            }
        },
        computed: {
            userResults(){
                return this.$root.$data.store.state.userResults;
            },
            groupResults(){
                return this.$root.$data.store.state.groupResults;
            }
        },
        mounted: function () {
            $('select').material_select();
        },
        methods: {
            search(){
                var selectedConnect = document.getElementById('selectedConnect');
                console.log(selectedConnect.value);
                var selectedGame = document.getElementById('selectedGame');
                console.log(selectedGame.value);
                if(selectedConnect.value == 'group'){
                    this.$root.$data.store.actions.searchGroups(selectedGame.value);
                } else if (selectedConnect.value == 'individual'){
                    this.$root.$data.store.actions.searchIndividual(selectedGame.value);
                }
            },
            resetSearch(){
                this.$root.$data.store.actions.clearSearch();
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