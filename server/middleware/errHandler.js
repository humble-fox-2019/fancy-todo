function errorHandler(err, req, res, next) {
    if (err.name == 'JsonWebTokenError') {
        console.log('Masuk Ke JWT Error')
        res.status(401).json({
            message: err.message
        })
    } else if (err.name == 'ValidationError') {
        let budleErr = []
        for (let key in err.errors) {
            budleErr.push(err.errors[key].message)
        }
        res.status(400).json({

            message: budleErr
        })
    } else {
        res.status(err.code || 500).json({
            code: err.code || 500,
            message: err.message
        })
    }
    console.log(JSON.stringify(err, null, 2))


}

module.exports = errorHandler