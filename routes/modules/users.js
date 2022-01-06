const express = require('express')
const bcrypt = require('bcryptjs')
const passport = require('passport')
const User = require('../../models/user')
const router = express.Router()


router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { email, password, confirmPassword } = req.body
  let { name } = req.body
  const errors = []

  // check all required fields
  if (!email || !password || !confirmPassword) {
    errors.push({ message: 'All fields are required' })
  }

  // check if passwords are all matched
  if (password !== confirmPassword) {
    errors.push({ message: 'Both password inputs are not matched' })
  }

  // if any error occurs, then render error
  if (errors.length) {
    return res.render('register', { errors, name, email })
  }

  // check if user exists or not
  return User.findOne({ email })
    .then(user => {
      if (user) {
        errors.push({ message: 'Email has been used' })
        return res.render('register', { errors, name, email })
      }

      // generate name based on email if no name provided
      if (!name) {
        const index = email.indexOf('@')
        name = email.slice(0, index)
      }

      // using bcrypt to create secure password
      // and create a new user in database
      return bcrypt.genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => {
          return User.create({
            name, email, password: hash
          })
        })
        .then(() => res.redirect('/users/login'))
        .catch(err => console.log(err))
    })
})

router.get('/logout', (req, res) => {
  req.flash('success_msg', 'You have successfully logout')
  req.logout()
  res.redirect('/users/login')
})


module.exports = router