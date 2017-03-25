<template>
    <div>
        <div class="parallax-container">
            <div class="parallax">
                <img class="parallax-bg" src="http://www.quiteenjoy.com/wp-content/uploads/2012/02/Nes-Grey-screen-feature1.png">
            </div>
        </div>
        <div class="section blue-grey darken-2 center">
            <div class="row container">
                <h3 class="header">It's dangerous to go alone!</h3>
                <div class="col s4">
                    <h5><i class="fa fa-users"></i> Make Friends</h5>
                    <p>Connect with others who play the same games as you! Bond over similiar interests.</p>
                </div>
                <div class="col s4">
                    <h5><i class="fa fa-steam-square"></i> Import Your Library*</h5>
                    <p>Connect your Steam account to be able to import your library! It makes connecting a breeze.</p>
                </div>
                <div class="col s4">
                    <h5><i class="fa fa-gamepad"></i> Play</h5>
                    <p>Find friends for obscure titles and the current hits! Say goodbye to having nobody to play with.</p>
                </div>
            </div>
            <div>
                <sup>*Note that your Steam profile must be set to public for our app to work. You can set your profile back to private after you've linked your account.</sup>
            </div>
        </div>
        <div class="parallax-container">
            <div class="parallax">
                <img class="parallax-bg" src="http://unsplash.com/photos/CuFYW1c97w8/download?force=true">
            </div>
            <div class="center">
                <router-link to="/sign-up" class="sign-up waves-effect waves-indigo btn btn-large indigo hoverable raised">Sign Up Today</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'landing-page',
        mounted: function () {
            $('.parallax').parallax();
        }
    }

</script>

<style>
    .parallax-container {
        height: 500px;
    }
    
    .sign-up {
        margin-top: 70px;
    }
    
    .parallax-bg {
        width: 100%;
    }
    /*.parallax {
        background-image: url("https://cdn0.vox-cdn.com/uploads/chorus_image/image/53522233/Nintendo_Switch_2.0.0.jpg");
        min-width: 100%;
        background-attachment: fixed;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    }
    
    .bgimg-2 {
        background-image: url("http://unsplash.com/photos/CuFYW1c97w8/download?force=true");
        min-height: 100%;
        background-attachment: fixed;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    }*/
    
    .section {
        padding-top: 20px;
        padding-bottom: 20px;
        color: white;
    }
    
    hr {
        margin-top: 5px;
        margin-bottom: 5px;
    }
</style>