<template>
    <div>
        <ul id="dropdown1" class="dropdown-content">
            <li><router-link :to="'/profile/' + this.$root.$data.store.state.user._id">My Profile</router-link></li>
            <li><router-link to="/">My Connections</router-link></li>
            <li><router-link to="/search">Search</router-link></li>
            <li><router-link to="/creategroup">Create Group</router-link></li>
            <li class="divider"></li>
            <li><a @click="logout">Logout</a></li>
        </ul>
        <div class="navbar-fixed">
            <nav class="black">
                <div class="nav-wrapper">
                    <a href="#" class="brand-logo">Multi Player</a>
                    <router-link v-if="this.$root.$data.store.state.user._id" :to="'/profile/' + this.$root.$data.store.state.user._id" class="brand-logo center">Hello, {{ this.$root.$data.store.state.user.username }}</router-link>
                    <ul v-if="!this.$root.$data.store.state.user._id" class="right hide-on-med-and-down">
                        <li>
                            <router-link to="login">Login</router-link>
                        </li>
                        <li>
                            <router-link to="sign-up">Sign Up</router-link>
                        </li>
                    </ul>
                    <ul v-if="this.$root.$data.store.state.user._id" id="nav-mobile" class="right menu-padding">
                        <li><a class="dropdown-button" data-constrainwidth="false" data-activates="dropdown1"><i class="fa fa-bars"></i></a></li>
                    </ul>
                </div>
            </nav>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Nav',
        mounted: function () {
            $(".dropdown-button").dropdown();
        },
        methods: {
            logout(){
                this.$root.$data.store.actions.logout();
                this.$router.push({ path: '/' });
            }
        },
        mounted(){
                this.$root.$data.store.actions.checkLoggedIn();
        }
    }

</script>

<style>
    .brand-logo {
        margin-left: 10px;
    }
    .menu-padding {
        margin-right: 30px;
    }
</style>