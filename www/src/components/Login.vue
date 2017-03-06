<template>
    <div>
        <div id="loginModal" class="modal">
            <div class="modal-content">
                <h4>Login</h4>
                <p>A bunch of text</p>
            </div>
            <div class="modal-footer">
                <a href="#!" class=" modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: 'Login',
        mounted(){
            $('.modal').modal();
            $('#loginModal').modal('open');
        }
    }

</script>

<style>
</style>