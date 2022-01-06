module.exports = {
  serverError: (res) => {
    const statusCode = 500
    return res.status(statusCode).render('error', {
      statusCode,
      message: 'Something went wrong, please try again later, or click Back button below.'
    })
  }
}