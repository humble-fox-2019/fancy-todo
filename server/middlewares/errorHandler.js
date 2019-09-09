function errorHandler(err, req, res, next) {
    console.log("err=========>", err, "<======err")
    const status = err.status || 500
    const message = err.message || 'internal server error'

    res.status(status).json({
        message
    })
}

module.exports = errorHandler