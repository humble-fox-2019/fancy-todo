module.exports = (err, req, res, next) =>{
    let status = err.status || 500
    let message = err.message || "internal server error"
    switch(message){
        case "token is not defined":{
            message = "You need to login first!"
            break
        }
    }
    res.status(status).json({message})
}