<template>
    <div>
        <form id="signupModal" class="modal">
            <div class="modal-content">
                <h4>Sign Up</h4>
                <div class="row">
                    <div class="input-field col s6">
                        <input type="text" id="username" v-model="username">
                        <label for="username">Username</label>
                    </div>
                    <div class="input-field col s6">
                        <input type="password" id="password" v-model="password">
                        <label for="password">Password</label>
                    </div>
                    <div class="input-field col s6">
                        <input type="password" id="confirmPass" v-model="confirmPass">
                        <label for="confirmPass">Confirm Password</label>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <div class="left">
                    <router-link to="/login" class="waves-effect waves-teal btn-flat">Login</router-link>
                </div>
                <div class="right">
                    <button type="submit" class="waves-effect waves-indigo btn indigo right-align">Sign Up</button>
                </div>
            </div>
        </form>
    </div>

</template>

<script>
    export default {
        name: 'Sign-Up',
        data() {
            return {
                username: '',
                password: '',
                confirmPass: ''
            }
        },
        mounted(){
            let vue = this;
            $('.modal').modal();
            var onModalHide = function(){
                vue.$router.push({path: '/'});
            }
            $('#signupModal').modal({
                complete : onModalHide
            });
            $('#signupModal').modal('open');
        }
    }

</script>

<style>
</style>