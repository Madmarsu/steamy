import passport from "passport"
import {
    steam
} from "../config/constants"
import Users from "../models/user.js"
import axios from "axios"
let router = require('express').Router()

let steamApi = axios.create({
    baseURL: 'http://api.steampowered.com/IPlayerService/',
    timeout: 3000,
    withCredentials: true
})
// GET /auth/steam
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Steam authentication will involve redirecting
//   the user to steamcommunity.com.  After authenticating, Steam will redirect the
//   user back to this application at /authenticate/steam/return
router.get('/steam/auth',
    passport.authenticate('steam', {
        failureRedirect: '/'
    }),
    function (req, res) {
        res.redirect('/');
    });

// GET /auth/steam/return
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/steam/auth/return',
    passport.authenticate('steam', {
        failureRedirect: '/'
    }),
    function (req, res) {
        res.redirect("/")
    });

router.get('/steam/update', function (req, res) {
    steamApi('GetOwnedGames/v0001/?key=' + steam.apiKey + '&steamid=' + req.session.passport.user.steamId + '&include_played_free_games=1&include_appinfo=1&format=json')
        .then(data => {
            Users.findByIdAndUpdate(req.session.uid, {
                    $set: {
                        games: data.data.response.games
                    }
                })
                .then(user => {
                    res.send({
                        msg: "Your list of games has been updated!",
                        data: user.games
                    })
                })
        }).catch(err => {
            res.send({
                err: err
            })
        })
})

module.exports = router