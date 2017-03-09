<template>
    <footer class="page-footer black text-white">
        <div class="footer-copyright">
            <div class="container">
                © 2017 Team Steamy
                <div class="right footer-icon">
                    <a class="grey-text text-lighten-4" href="http://store.steampowered.com/"><i class="fa fa-steam-square"></i></a>                    | <a class="grey-text text-lighten-4" href="https://github.com/jaime-lynn/steamy"><i class="fa fa-github"></i></a>

                </div>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    name: 'footer-bar'
}
</script>

<style>
    body {
        display: flex;
        min-height: 100vh;
        flex-direction: column;
    }
    
    main {
        flex: 1 0 auto;
    }
    
    .footer-icon {
        font-size: 24px;
        margin-bottom: 7px;
    }
</style>