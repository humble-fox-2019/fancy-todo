module.exports = (err, req, res, next) => {
  console.log(err);
  // console.log(err.errors.email.message);
  const status = err.status || 500
  const message = err.message || 'Internal Server Error'

  res.status(status).json({ message })
}