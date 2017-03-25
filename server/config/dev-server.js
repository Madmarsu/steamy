import env from './env'
import { steam } from "./constants"
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { defaultErrorHandler, corsOptions } from './handlers'
import api from '../models'
import Users from "../models/user.js"
import session from '../authentication/sessions'
import Auth from '../authentication/auth'
import Steam from '../authentication/steam'
import passport from "passport"
import SteamStrategy from "../lib/passport-steam"
import axios from "axios"
import socket_io from "socket.io"
let app = express()
let server = require('http').createServer(app);
let io = socket_io.listen(server)

io.on('connection', function (socket) {

    socket.on('groupMessage', function() {
        console.log('got a group message')
        io.emit('groupMessageAdded')
    })
    socket.on('chatMessage', function(){
        console.log('got a chat message')
        io.emit('chatMessageAdded')
    })

})
// ENABLE ROUTES IF USING app SIDE ROUTING
// import routes from './routes'


function Validate(req, res, next) {
    // BLOCK STEAM ROUTES IF ALREADY LINKED
    // if (req.url.includes("steam/auth") && req.session.passport.user && req.session.passport.user.steamId){
    //     return res.send({ error: 'Your steamId ('+ req.session.passport.user.steamId+") has already been linked to your profile." })
    // }
    // ONLY ALLOW ANY METHOD IF LOGGED IN (Not Auth routes)
    if (!req.session.uid) {
        return res.send({ error: 'Please Login or Register to continue' })
    }
    return next()
}

function logger(req, res, next) {
    console.log('INCOMING REQUEST', req.url)
    next()
}

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Steam profile is serialized
//   and deserialized.
passport.serializeUser(function (user, done) {
    done(null, { _id: user._id, steamId: user.steamId });
});

passport.deserializeUser(function (obj, done) {
    Users.findById(obj._id, function (err, user) {
        done(err, user);
    });
});

// Use the SteamStrategy within Passport.
//   Strategies in passport require a `validate` function, which accept
//   credentials (in this case, an OpenID identifier and profile), and invoke a
//   callback with a user object.
let steamApi = axios.create({
    baseURL: 'http://api.steampowered.com/IPlayerService/',
    timeout: 3000,
    withCredentials: true
})

passport.use(new SteamStrategy({
    returnURL: steam.returnURL,
    realm: steam.realm,
    apiKey: steam.apiKey,
    passReqToCallback: true
},
    function (req, identifier, profile, done) {
        console.log(profile);
        req.session.steamId = profile.id
        req.session.save()
        Users.findByIdAndUpdate(req.session.uid, { $set: { steamId: profile.id, avatar: profile._json.avatarfull } })
            .then(user => {
                steamApi('GetOwnedGames/v0001/?key=' + steam.apiKey + '&steamid=' + profile.id + '&include_played_free_games=1&include_appinfo=1&format=json')
                    .then(res => {
                        Users.findByIdAndUpdate(req.session.uid, { $set: { games: res.data.response.games } })
                            .then(user => {
                                done(null, user)
                            })
                    })
            })
            .catch(err => {
                done(err, false)
            })
    }
));

// REGISTER MIDDLEWARE
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    // if ('OPTIONS' == req.method) {
    //     res.send(200);
    // } else {
        next();
    // }
});


// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(session)
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('*', logger)
// app.use('*', cors(corsOptions))
app.use(cors(corsOptions))
app.use('*', cors(corsOptions))
app.use(Auth)

// LOCKS API TO REQUIRE USER AUTH
app.use(Validate)
app.use(Steam)
app.use('/api', api)
app.use('/', defaultErrorHandler)

// USING SOCKETS
// let io = require('socket.io')(server, {
//     origins: '*:*'
// })

// io.on('connection', function (socket) {
//     socket.emit('CONNECTED', {
//         socket: socket.id,
//         message: 'Welcome to the Jungle'
//     })

//     socket.on('update', function (data) {
//         console.log(data)
//     })

    // socket.join('Kanban', function(){
    //     io.to('Kanban').emit('message', 'A new user has joined the channel.');
    // });
    // socket.on('message', function(data){
    //     // if(data.text){
    //         // data.text = data.text.replace(/[<>]/g, '');
    //     io.to('Kanban').emit('message', data);
    // });
// });

export default server