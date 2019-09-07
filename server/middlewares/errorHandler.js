function errorHandler(err, req, res, next) {

    if (err.name == 'JsonWebTokenError') {
        res.status(401).json({
            message: "invalid token"
        });
    }
    else if (err.name == "ValidationError") {
        res.status(400).json({
            message: err.message
        });
    }
    else {
        res.status(err.statusCode || 500).json({
            message: err.msg
        });
    }
}

module.exports = errorHandler
