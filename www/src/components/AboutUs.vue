<template>
    <div>
        <div class="section blue-grey darken-2 center">
            <div class="row container">
                <h3 class="header">It's dangerous to go alone!</h3>
                <div class="col s4">
                    <h5><i class="fa fa-user"></i> Players</h5>
                    <p>Connect with others who play the same games as you! Bond over similiar interests.</p>
                </div>
                <div class="col s4">
                    <h5><i class="fa fa-users" aria-hidden="true"></i> Groups</h5>
                    <p>Connect with multiple players within groups ... </p>
                </div>
                <div class="col s4">
                    <h5><i class="fa fa-gamepad" aria-hidden="true"></i> Games </h5>
                    <p>Learn more about your favorite games, find new games to play!</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'about-us',
        mounted: function () {
            $('.parallax').parallax();
        }
    }

</script>

<style>
   
</style>