<template>
    <div>
        <ul id="dropdown1" class="dropdown-content">
            <li><router-link to="/myprofile">My Profile</router-link></li>
            <li><router-link to="/">My Connections</router-link></li>
            <li><router-link to="/search">Search</router-link></li>
            <li><router-link to="/creategroup">Create Group</router-link></li>
            <li class="divider"></li>
            <li><a @click="logout">Logout</a></li>
        </ul>
        <div class="navbar-fixed">
            <nav class="black">
                <div class="nav-wrapper">
                    <a href="#" class="brand-logo hide-on-small-only left">Multi Player</a>
                    <a href="#" class="brand-logo hide-on-med-and-up left">MP</a>
                    <!-- The "Hello username" feature was causing issues on smaller screens-->
                        <router-link v-if="this.$root.$data.store.state.user._id" to="/myprofile" class="brand-logo center">Hello, {{ this.$root.$data.store.state.user.username }}</router-link>
                    <ul v-if="!this.$root.$data.store.state.user._id" class="right hide-on-med-and-down">
                        <li>
                            <router-link to="login">Login</router-link>
                        </li>
                        <li>
                            <router-link to="sign-up">Sign Up</router-link>
                        </li>
                    </ul>
                    <ul v-show="this.$root.$data.store.state.user._id" id="nav-mobile" class="right menu-padding">
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
        methods: {
            logout(){
                this.$root.$data.store.actions.logout();
                
            }
        },
        mounted(){
                this.$root.$data.store.actions.checkLoggedIn();
                $(".dropdown-button").dropdown();
        },
        activated(){
            console.log("activated")
            this.$nextTick(()=>{
                console.log("Next tick")
                setTimeout(()=>{
                    $(".dropdown-button").dropdown();
                }, 1000)
                
            })
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