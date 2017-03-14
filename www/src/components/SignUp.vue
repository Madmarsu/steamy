<template>
    <div>
        <form @submit.prevent="registerUser" id="signupModal" class="modal">
            <div class="modal-content">
                <h4 class="center">Sign Up</h4>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" id="username" v-model="username" required>
                        <label for="username">Username</label>
                    </div>
                    <div class="input-field col s6">
                        <input type="password" id="password" v-model="password" required>
                        <label for="password">Password</label>
                    </div>
                    <div class="input-field col s6">
                        <input type="password" id="confirmPass" v-model="confirmPass" required>
                        <label for="confirmPass">Confirm Password</label>
                    </div>
                    <div class="input-field col s12">
                        <input type="checkbox" class="filled-in" id="filled-in-box">
                        <label for="filled-in-box"><sup>I understand that my Steam profile must be set to public for me to link my profile.</sup></label>
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
        mounted() {
            let vue = this;
            $('.modal').modal();
            var onModalHide = function () {
                vue.$router.push({ path: '/' });
            }
            $('#signupModal').modal({
                complete: onModalHide
            });
            $('#signupModal').modal('open');
        },
        methods: {
            registerUser: function () {
                var checkbox = document.getElementById('filled-in-box').checked;
                if (!checkbox) {
                    Materialize.toast('You need to acknowledge our terms and conditions!', 1000);
                } else {
                    if (this.password == this.confirmPass) {
                        this.$root.$data.store.actions.register(this.username, this.password);
                        this.email = '';
                        this.password = '';
                        this.confirmPass = '';
                        $('#signupModal').modal('close');
                        this.$router.push({ path: '/' });
                    } else {
                        this.password = '';
                        this.confirmPass = '';
                        Materialize.toast('Your password don\'t match.', 1000);
                    }
                }
            }
        }
    }

</script>

<style>

</style>