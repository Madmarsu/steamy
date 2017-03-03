import axios from 'axios'

let router = require('express').Router()
let Users = require('../models/user')

let steamApi = axios.create({
  baseURL: 'http://api.steampowered.com/IPlayerService/',
  timeout: 3000,
  withCredentials: true
})

let steamKey = '7B9839E0AACE2FABC3E69561417B07C8'

router.post('/register', (req, res) => {
  Users.create(req.body)
    .then((user) => {
      req.session.uid = user._id
      req.session.save()
      user.password = null
      delete user.password
      res.send({
        message: 'Successfully created user account',
        data: user
      })
    })
    .catch(err => {
      res.send({ error: err })
    })
})


router.post('/login', (req, res) => {
  Users.findOne({ username: req.body.username })
    .then(user => {
      user.validatePassword(req.body.password)
        .then(valid => {
          if(!valid){
            return res.send({error: 'Invalid Username or Password'})
          }
          req.session.uid = user._id;
          req.session.save()
          user.password = null
          delete user.password
          res.send({
            message: 'successfully logged in',
            data: user
          })
        })
        .catch(err => {
          res.send({ error: err || 'Invalid Username or Password' })
        })
    })
    .catch(err => {
      res.send({
        error: err,
        message: 'Invalid Username or Password'
      })
    })
})

router.delete('/logout', (req, res) => {
  req.session.destroy()
  res.send({
    message: 'You have successfully been logged out. Please come back soon!'
  })
})


router.get('/authenticate', (req,res) => {
  Users.findById(req.session.uid).then(user => {
    return res.send ({
      data: user
    })
  }).catch(err=>{
    return res.send({
      error:err 
    })
  })
})

// GET /auth/steam
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Steam authentication will involve redirecting
//   the user to steamcommunity.com.  After authenticating, Steam will redirect the
//   user back to this application at /authenticate/steam/return
router.get('/authenticate/steam',
  passport.authenticate('steam', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  });

// GET /auth/steam/return
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/authenticate/steam/return',
  passport.authenticate('steam', { failureRedirect: '/' }),
  function (req, res) {
    Users.findByIdAndUpdate(req.session.uid, {$set: { steamId: req.session.passport.user._id, avatar: req.session.passport.user.avatar } })
      .then(user => {
        steamApi('GetOwnedGames/v0001/?key=' + steamKey + '&steamid=' + user.steamId + '&include_played_free_games=1&include_appinfo=1&format=json')
          .then(res => {
            Users.findByIdAndUpdate(req.session.uid, {$set: { games: res.response.games }})
              .then(user => {
                res.send({
                  data: user
                })
              })
          })
      })
      .catch(err => {
        res.send({
          error: err
        })
      })
  });

module.exports = router