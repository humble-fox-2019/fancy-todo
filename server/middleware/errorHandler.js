function errorHandler(err, req, res, next) {
  const status = err.status || 500
  const message = err.message || 'Internal server error'

  console.log(err)
  
  if(err.name === 'ValidationError') {
    const errors = []
    for(let key in err.errors) {
      errors.push(err.errors[key].message)
    }
    res.status(400).json(errors)
  }else if(err.message === 'The verifyIdToken method requires an ID Token') {
    res.status(401).json(err.message)
  }else{
    res.status(status).json(message)
  }
}




module.exports = errorHandler
