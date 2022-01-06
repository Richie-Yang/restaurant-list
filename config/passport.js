const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const User = require('../models/user')


module.exports = app => {
  // initialize Passport module
  app.use(passport.initialize())
  app.use(passport.session())

  // local login strategy setup
  passport.use(new LocalStrategy(
    { usernameField: 'email' },
    (email, password, done) => {
      return User.findOne({ email })
        .then(user => {
          if (!user) {
            console.log('Email does not exist')
            return done(null, false)
          }

          return bcrypt.compare(password, user.password)
            .then(isMatch => {
              if (!isMatch) {
                console.log('Email or password is not correct')
                return done(null, false)
              }

              return done(null, user)
            })
        })
        .catch(err => done(err, false))
    }))

  // serialize and deserialize setup
  passport.serializeUser((user, done) => {
    return done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    return User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, false))
  })
}
