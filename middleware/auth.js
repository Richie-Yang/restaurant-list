module.exports = {
  authenticator: (req, res, next) => {
    if (!req.isAuthenticated()) {
      req.flash('warning_msg', 'Please login before access the content')
      return res.redirect('/users/login')
    }
    next()
  }
}