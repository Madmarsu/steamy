<template>
    <div class="container">
        <form @submit.prevent="createGroup(name, game, description)">
            <h4>Create Group</h4>
            <div class="input-field">
                <input id="game" type="text" v-model="game">
                <!-- Add dropdown and autocomplete-->
                <label for="game">Game</label>
            </div>
            <div class="input-field">
                <input id="title" type="text" v-model="title">
                <label for="title">Title</label>
            </div>
            <div class="row">
                <form class="col s12">
                    <div class="row">
                        <div class="input-field col s12">
                            <textarea id="textarea1" class="materialize-textarea"></textarea>
                            <label for="textarea1">Description</label>
                        </div>
                    </div>
                </form>
            </div>
            <button>Create Group</button>
        </form>
    </div>
</template>

<script>
    //import thing from './things'

    export default {
        name: 'creategroup',
        components: {},
        data() {
            return {
                game: '',
                title: '',
                description: ''
            }
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