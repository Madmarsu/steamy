<template>
    <div>
        <form id="loginModal" class="modal">
            <div class="modal-content">
                <h4>Login</h4>
                <div class="row">
                    <div class="input-field col s6">
                        <input type="text" id="username" v-model="username">
                        <label for="username">Username</label>
                    </div>
                    <div class="input-field col s6">
                        <input type="password" id="password" v-model="password">
                        <label for="password">Password</label>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <div class="left">
                    <router-link to="/sign-up" class="waves-effect waves-teal btn-flat">Sign Up</router-link>
                </div>
                <div class="right">
                    <button type="submit" class="waves-effect waves-indigo btn indigo right-align">Login</button>
                </div>
            </div>
        </form>
    </div>

</template>

<script>
    export default {
        name: 'Login',
        data() {
            return {
                username: '',
                password: ''
            }
        },
        mounted(){
            $('.modal').modal();
            $('#loginModal').modal('open');
        }
    }

</script>

<style>
</style>