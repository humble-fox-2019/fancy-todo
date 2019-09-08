function errorHandler ( err , req , res , next ) {
    console.log( "Entering Error Handler Zone.... ")
    console.log( err )
    let status = err.status || 500;
    let message = err.message || `Internal Server Error`;

    if ( err.name == 'MongoError' ) {
        if ( err.errmsg.includes('duplicate key') ) {
            status = 400;
            message = `Email already registered!`
        }
    }

  
    res.status(status).json({ status , message });
}
module.exports = errorHandler