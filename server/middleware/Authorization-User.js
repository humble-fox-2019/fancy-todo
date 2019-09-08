const { user: User } = require('../models')

module.exports = (req, res, next) => {
    const todoId = req.params.todoId
    User.findOne({ _id: req.decode._id }).populate('Todo')
        .then((user) => {
            if (user) {
                next()
            } else {
                // next({ status: 403, message: "You have no authorization on this Todo" })
            }
        }).catch(next);
}