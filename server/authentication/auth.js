import axios from 'axios'
import passport from "passport"
let router = require('express').Router()
let Users = require('../models/user')


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
          if (!valid) {
            return res.send({ error: 'Invalid Username or Password' })
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


router.get('/authenticate', (req, res) => {
  if (!req.session.uid) {
    return res.send({
      error: "Please login or register to continue!"
    })
  }
  Users.findById(req.session.uid).then(user => {
    return res.send({
      data: user
    })
  }).catch(err => {
    return res.send({
      error: err
    })
  })
})

router.get('/check-logged-in', (req, res) => {
  if (!req.session.uid) {
    return res.send({
      message: 'You aren\'t logged in'
    })
  }
  Users.findById(req.session.uid)
    .then(user => {
      return res.send({
        data: user
      })
        .catch(err => {
          return res.send({
            error: err
          })
        })
    })
})


module.exports = router