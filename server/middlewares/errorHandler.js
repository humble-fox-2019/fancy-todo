function errorHandler(err, req, res, next) {
    console.log(JSON.stringify(err));
    let status = err.status || 500
    let message = err.message || `Internal Server Error`
    if (err.name === 'ValidationError') {
      message = []
      status = 400
      for (let i in err.errors) {
        message.push(err.errors[i].message)
      }
    }
    res.status(status).json({
      message: message
    })
  }
  
  module.exports = errorHandler