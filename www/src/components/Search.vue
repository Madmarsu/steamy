<template>
    <div class="container">
        <div class="card blue-grey">
                <form @submit.prevent="">
                    <div class="card-content white-text">
                        <h4 class="center">Search</h4>
                        <div class="input-field">
                            <select v-model="game">
                            <option v-for="game in games" value="game.name">{{ game.name }}</option>
                        </select>
                            <label>Game</label>
                        </div>
                        <div class="input-field">
                            <div class="row">
                                <div class="col s12">
                                    <input name="connectionType" type="radio" id="group" />
                                    <label for="group">Group</label>
                                </div>
                                <div class="col s12">
                                    <input name="connectionType" type="radio" id="individual" />
                                    <label for="individual">Individual</label>
                                </div>
                            </div>
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
                description: '',
                games: [{
                    name: "Mass Effect",
                    appId: 1
                }, {
                    name: "Breath of the Wild",
                    appId: 2
                }, {
                    name: "Fire Emblem",
                    appId: 3
                }],
                game: '',
                userResults: [{
                    avatar: "http://www.forumla.de/attachments/kreative-ecke/151339d1395599937-avatar-wettbewerb-abstimmung-tumblr_mwe88mlxe41sare1go1_1280.png",
                    username: "Monokuma"
                },
                {
                    avatar: "http://cdn.edgecast.steamstatic.com/steamcommunity/public/images/avatars/f6/f680adac740a04981e100f7bbb6ec85eed1e5926_full.jpg",
                    username: "KittyGuy"
                },
                {
                    avatar: "https://s-media-cache-ak0.pinimg.com/736x/e7/ef/a2/e7efa2a9098cdcfc38a9f4bdaec06d42.jpg",
                    username: "Paladin Danse"
                }]
            }
        },
        mounted: function () {
            $('select').material_select();
        },
    }

</script>

<style>
    .avatar {
        width: 50px;
        height: 50px;
    }
</style>