const bcrypt = require('bcryptjs')

const salt = bcrypt.genSaltSync(10);

function hash( string ) {
    return bcrypt.hashSync( string , salt );
}
function compare ( string_1 , string_2 ) {
    return bcrypt.compareSync( string_1 , string_2 );
}

module.exports = {
    hash,
    compare
}