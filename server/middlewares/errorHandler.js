module.exports = (err, req, res, next) => {
  console.log(err)
  let status, errors
  if (err.name === 'JsonWebTokenError') {
    status = 400
    errors = [err.message]
  } else if (err.name === 'ValidationError') {
    status = 400
    errors = []
    for (let key in err.errors) {
      errors.push(err.errors[key].message)
    }
  } else if (err.name === 'MongoError') {
    status = 400
    errors = ['Email already registered']
  } else {
    status = err.status || 500
    errors = [err.message] || ['Internal server error']
  }
  res.status(status).json({ errors })
}