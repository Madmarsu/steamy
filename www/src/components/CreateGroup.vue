<template>
    <div class="container">
        <div class="card blue-grey">
            <form @submit.prevent="createGroup">
                <div class="card-content white-text">
                    <h4 class="center">Create Group</h4>
                    <div class="input-field">
                        <select id="selected">
                            <option v-for="game in this.$root.$data.store.state.user.games" :value="game.name">{{ game.name }}</option>
                        </select>
                        <label>Game</label>
                    </div>
                    <div class="input-field">
                        <input id="title" type="text" v-model="title" required>
                        <label for="title">Title</label>
                    </div>
                    <div class="input-field col s12">
                        <textarea id="textarea1" class="materialize-textarea" v-model="description"></textarea>
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
            createGroup() {
                let vue = this;
                var select = document.getElementById('selected');
                this.$root.$data.store.actions.createGroup(select.value, this.title, this.description);
            }
        }

    }

</script>

<style>

</style>