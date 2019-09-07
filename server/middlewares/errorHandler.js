const mongoose = require('mongoose');

function errorHandler(err, req, res, next) {
    console.log(err);

    if (err.name == 'JsonWebTokenError') {
        res.status(401).json({
            message: "invalid token"
        });
    } else if (err.name == "ValidationError") {
        res.status(400).json({
            message: err.message
        });
    } else if (err.name == 'CastError') {
        return res.status(400).send({
            message: 'Invalid ID'
        });
    } else if (err.statusCode == 404 && err.msg === undefined) {
        res.status(404).json({
            message: "Data not found"
        });
    } else {
        res.status(err.statusCode || 500).json({
            message: err.msg || 'Internal server error'
        });
    }
}

module.exports = errorHandler
