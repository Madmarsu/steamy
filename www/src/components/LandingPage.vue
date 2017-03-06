<template>
    <div>
        <div class="parallax-container">
            <div class="parallax"></div>
        </div>
        <div class="section blue-grey darken-2 center">
            <div class="row container">
                <h3 class="header">TAGLINE HERE</h3>
                <div class="col s4">
                    <h5>FONt AWESome CATChy</h5>
                    <p>blurb</p>
                </div>
                <div class="col s4">
                    <h5><i class="fa fa-steam"></i> Import Your Library*</h5>
                    <p>Connect your Steam account to be able to import your library! It makes making connections a breeze.</p>
                </div>
                <div class="col s4">
                    <h5>FONt AWESome CATChy</h5>
                    <p>blurb</p>
                </div>
            </div>
            <div>
                <sup>*Note that your Steam profile must be set to public for us to be able to query your owned games. You can set your profile back to private after we have linked your account.</sup>
            </div>
        </div>
        <div class="parallax-container">
            <div class="bgimg-2 center">
                <button class="sign-up waves-effect waves-indigo btn btn-large indigo hoverable raised">Sign Up Today</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'landing-page'
    }

</script>

<style>
    .parallax-container {
        height: 400px;
    }


    .sign-up {
        margin-top: 70px;
    }


    .parallax {
        /* The image used */
        background-image: url("https://cdn0.vox-cdn.com/uploads/chorus_image/image/53522233/Nintendo_Switch_2.0.0.jpg");
        /* Set a specific height */
        min-width: 100%;
        /* Create the parallax scrolling effect */
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
    }




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