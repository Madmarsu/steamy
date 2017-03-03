<template>
    <div>
        <form @submit.prevent="createGroup(name, game, description)">
            <h2>Create Group</h2>
                <div>
                    <h4>Game: </h4>
                    <input type="text" v-model="game"> <!-- Add dropdown and autocomplete-->
                </div>
                <div>
                    <h4>Title: </h4>
                    <input type="text" v-model="title">
                </div>
                <div>
                    <h4>Description: </h4>
                    <textarea rows="4" cols="50" v-model="description"> 
                    </textarea>
                </div>
                <button>Create Group</button>
        </form>
    </div>
</template>

<script>
import thing from './things'

export default {
    name: 'creategroup',
    components: { },
    data(){
        return{
            game: '',
            title: '',
            description: ''
        }
    },
    methods: {
        createGroup(game, title, description){
            return newGroup
        }
    }
    
}
</script>

<style>

</style>