module.exports = (err, req, res, next) => {
    console.log(err)
    let status
    let message

    switch (err.name) {
        case 'ValidationError':
            status = 400
            let arr = []
            for (const key in err.errors) {
                arr.push(err.errors[key].message)
            }
            message = arr
            break;
        case 'AuthenthicationError':
            status = 401
            message = err.message
            break;
        case 'JsonWebTokenError':
            status = 401
            message = "You are not logged in."
            break;
        default:
            status = err.status || 500
            message = err.message || 'Internal Server Error'
            break;
    }
    res.status(status).json(message)
}