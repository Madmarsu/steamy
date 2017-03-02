let router = require('express').Router()
let Users = require('../models/user')

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
app.get('/authenticate/steam/return',
  passport.authenticate('steam', { failureRedirect: '/' }),
  function (req, res) {
    console.log(req.session.uid)
    console.log("SESSION", req.session)
    Users.findByIdAndUpdate(req.session.uid, {$set: { steamId: req.session.steamId } })
    console.log("session",req.session)
    res.redirect('/');
  });

module.exports = router