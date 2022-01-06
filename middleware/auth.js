module.exports = {
  authenticator: (req, res, next) => {
    if (!req.isAuthenticated()) {
      console.log('This visitor has no permission yet')
      return res.redirect('/users/login')
    }
    next()
  }
}