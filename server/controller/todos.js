const todosModel = require('../model/todos')

class Todo {

    static create(req, res, next) {
        // console.log('masuk ke create di server')
        const {
            todo,
            description,
            dueDate
        } = req.body
        todosModel.create({
                userId: req.payload._id,
                todo,
                description,
                dueDate
            })
            .then(data => {
                res.status(201).json(data)
            })
            .catch(next)
    }
    static update(req, res, next) {
        const {
            todo,
            description,
            dueDate
        } = req.body
        todosModel.updateOne({
                _id: req.params.id,
            }, {
                todo,
                description,
                dueDate
            })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }

    static findAll(req, res, next) {
        todosModel.find({
                userId: req.payload._id
            })
            .then(data => {
                console.log(data)
                res.status(200).json(data)
            })
            .catch(next)
    }
    static delete(req, res, next) {
        console.log('masuk ke delete')
        todosModel.deleteOne({
                _id: req.params.id
            })
            .then(data => {
                console.log('berhasil ke delete')
                res.status(200).json(data)
            })
            .catch(next)
    }
    static findById(req, res, next) {
        console.log('pasti bisa aku pasti bisa ku tak mau berputus asa')
        todosModel.findById({
                _id: req.params.id
            })
            .then(data => {
                console.log('berhasil ke update')
                res.status(200).json(data)

            })
            .catch(next)
    }
    static search(req, res, next) {
        console.log('goooooo ini search')
        todosModel.find()
            .then(data => {
                console.log(req.query.todo, '<<<< Ini Searchnyaaa looh')
                let searched = data.filter(data1 => {
                    let regex = new RegExp(`${req.query.todo}`, 'i')
                    return regex.test(data1)
                    // console.log(regex.test(data1.name))
                })
                res.status(200).json(searched)

            })
            .catch(next)
    }

}

module.exports = Todo