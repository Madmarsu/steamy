import env from './env'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { defaultErrorHandler, corsOptions } from './handlers'
import api from '../models'
import Users from "../models/user.js"
import session from '../authentication/sessions'
import Auth from '../authentication/auth'
import passport from "passport"
import SteamStrategy from "../lib/passport-steam"

// ENABLE ROUTES IF USING app SIDE ROUTING
// import routes from './routes'

let app = express()
let server = require('http').createServer(app);

function Validate(req, res, next) {
    // ONLY ALLOW GET METHOD IF NOT LOGGED IN 
    if (req.method !== 'GET' && !req.session.uid) {
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
    console.log("user", user)
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    console.log("id", id)
    Users.findOne({steamid: id}, function(err, user) {
        done(err, user);
    });
});

// Use the SteamStrategy within Passport.
//   Strategies in passport require a `validate` function, which accept
//   credentials (in this case, an OpenID identifier and profile), and invoke a
//   callback with a user object.
passport.use(new SteamStrategy({
    returnURL: 'http://localhost:3000/authenticate/steam/return',
    realm: 'http://localhost:3000/',
    apiKey: '99B125DE809E1AA62AA914DB59F3B21F',
    passReqToCallback: true
  },
  function(req, identifier, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {

      // To keep the example simple, the user's Steam profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Steam account with a user record in your database,
      // and return that user instead.
        profile.identifier = identifier;
      console.log("req", req.session)  
      console.log("profile", profile)
      return done(null, profile);
    });
  }
));

// REGISTER MIDDLEWARE
app.use(session)
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('*', logger)
app.use('*', cors(corsOptions))
app.use(Auth)

// LOCKS API TO REQUIRE USER AUTH
app.use(Validate)
app.use('/api', api)
app.use('/', defaultErrorHandler)

// USING SOCKETS
let io = require('socket.io')(server, {
    origins: '*:*'
})

io.on('connection', function(socket){
	socket.emit('CONNECTED', {
		socket: socket.id,
		message: 'Welcome to the Jungle'
	})

    socket.on('update', function(data){
        console.log(data)
    })

    // socket.join('Kanban', function(){
    //     io.to('Kanban').emit('message', 'A new user has joined the channel.');
    // });
    // socket.on('message', function(data){
    //     // if(data.text){
    //         // data.text = data.text.replace(/[<>]/g, '');
    //     io.to('Kanban').emit('message', data);
    // });
});

export default server