const Router = require('express').Router()
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

// * Get all routes from directory
const output = {}
fs.readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .map(file => {
        file = file.replace('.js', '')
        output[file] = require(('./' + file))
    }
    )

// * select routes to use
const { } = output

Router.get('/', (req, res) => {
    res.status(200).json({
        message: "connected"
    })
})

// * Routes



module.exports = Router