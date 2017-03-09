<template>
    <div>
        <!--<ul id="dropdown1" class="dropdown-content">
            <li>
                <router-link to="profile">My Profile</router-link>
            </li>
            <li><a href="#">My Connections</a></li>
            <li><a href="#">Find Connections</a></li>
            <li><a href="#">Create Group</a></li>
            <li class="divider"></li>
            <li><a href="#">Logout</a></li>
        </ul>-->
        <div class="navbar-fixed">
            <nav class="indigo darken-4">
                <div class="nav-wrapper">
                    <a href="#" class="brand-logo">Multi Player</a>
                    <!-- v-if="!this.$root.$data.store.state.user._id" -->
                    <ul id="nav-mobile" class="right hide-on-med-and-down">
                        <li>
                            <router-link to="login">Login</router-link>
                        </li>
                        <li>
                            <router-link to="sign-up">Sign Up</router-link>
                        </li>
                    </ul>
                    <!-- if logged in
                <ul id="nav-mobile" class="right hide-on-med-and-down">
                    <li><a class="dropdown-button" data-activates="dropdown1"><i class="material-icons">menu</i></a></li>
                </ul>
                -->
                </div>
            </nav>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Nav',
        methods: {

        }
    }
    // $(".dropdown-button").dropdown();

</script>

<style>
    .brand-logo {
        margin-left: 10px;
    }
</style>