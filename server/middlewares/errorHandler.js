module.exports = (err, req, res, next) => {

    let status = err.status || 500
    let message = err.message || 'Internal server error'
    
    console.log(err)
    if(err.message.name == 'JsonWebTokenError'){
        status = 403
        message = `You must be Logged In First`
    } else if (err.message.name == "ValidationError"){
        status = 400
        message = err.message.message
    }

    res.status(status).json({message})
}