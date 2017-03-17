import passport from "passport"
import SteamStrategy from "../lib/passport-steam"
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
router.get('/steam/auth', (req, res, next) => {
    let origin = req.headers.origin;
    console.log(req.headers.origin);
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
    res.header('Access-Control-Allow-Credentials', true);

    res.redirect("https://steamcommunity.com/openid/login?openid.mode=checkid_setup&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&openid.ns.sreg=http%3A%2F%2Fopenid.net%2Fextensions%2Fsreg%2F1.1&openid.sreg.optional=nickname%2Cemail%2Cfullname%2Cdob%2Cgender%2Cpostcode%2Ccountry%2Clanguage%2Ctimezone&openid.ns.ax=http%3A%2F%2Fopenid.net%2Fsrv%2Fax%2F1.0&openid.ax.mode=fetch_request&openid.ax.type.fullname=http%3A%2F%2Faxschema.org%2FnamePerson&openid.ax.type.firstname=http%3A%2F%2Faxschema.org%2FnamePerson%2Ffirst&openid.ax.type.lastname=http%3A%2F%2Faxschema.org%2FnamePerson%2Flast&openid.ax.type.email=http%3A%2F%2Faxschema.org%2Fcontact%2Femail&openid.ax.required=fullname%2Cfirstname%2Clastname%2Cemail&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.return_to=http%3A%2F%2Flocalhost%3A3000%2Fsteam%2Fauth%2Freturn&openid.realm=http%3A%2F%2Flocalhost%3A3000%2F")

    //     let x = passport.authenticate('steam', {
    //         failureRedirect: '/'
    //     })
    //     res.header("Access-Control-Allow-Origin", 'http://localhost:8080');
    //     console.log(req.headers.origin);
    //     x(req, res, next);
    // },
    // function (req, res) {
    //     res.redirect('/');
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
        console.log("Steam User Authenticated", req.session.uid);
        res.redirect("http://localhost:8080/")
    });

router.get('/steam/update', function (req, res) {
    Users.findById(req.session.uid)
        .then(user => {
            steamApi('GetOwnedGames/v0001/?key=' + steam.apiKey + '&steamid=' + user._id + '&include_played_free_games=1&include_appinfo=1&format=json')
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
                })
        })
        .catch(err => {
            res.send({
                err: err
            })
        })
})

module.exports = router