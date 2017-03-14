<template>
    <div class="container">
        <div class="card blue-grey">
            <form @submit.prevent="createGroup(name, game, description)">
                <div class="card-content white-text">
                    <h4 class="center">Create Group</h4>
                    <div class="input-field">
                        <select v-model="game">
                            <option v-for="game in games" value="game.name">{{ game.name }}</option>
                        </select>
                        <label>Game</label>
                    </div>
                    <div class="input-field">
                        <input id="title" type="text" v-model="title">
                        <label for="title">Title</label>
                    </div>
                    <div class="input-field col s12">
                        <textarea id="textarea1" class="materialize-textarea"></textarea>
                        <label for="textarea1">Description</label>
                    </div>
                    <div class="input-field center">
                        <button class="waves-effect waves-teal btn indigo" type="submit">Create Group</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    //import thing from './things'

    export default {
        name: 'creategroup',
        components: {},
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
                game: ''
            }
        },
        mounted: function () {
            $('select').material_select();
        },
        methods: {
            createGroup(game, title, description) {
                return newGroup
            }
        }

    }

</script>

<style>

</style>