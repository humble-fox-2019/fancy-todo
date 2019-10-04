const Todo = require('../models/todo');

module.exports = {
    isOwner(req, res, next) {
        const _id = req.params.id
        const { UserId } = req.decoded;
        Todo.findOne({_id, UserId})
            .then(todo => {
                if (todo) {
                    next();
                } else {
                    next({status:404, message: `You haven't authorized`})
                }
            })
            .catch(next);
    }
}