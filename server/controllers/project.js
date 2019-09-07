const { project: Project, todo: Todo } = require('../models');

class ProjectController {
    static read(req, res, next) {
        Project.find({})
            .then((projects) => {
                res.status(200).json(projects)
            })
            .catch(next);
    };

    static create(req, res, next) {
        const { _Id: userId } = req.decode
        const { name } = req.body
        Project.create({
            name,
            projectOwner: userId
        })
            .then((newProject) => {
                res.status(201).json(newProject)
            })
            .catch(next);
    };

    static update(req, res, next) {
        const { projectId } = req.params
        const { name } = req.body
        Project.updateOne({ _id: projectId }, { name }, { runValidators: true })
            .then((updatedProject) => {
                res.status(200).json(updatedProject)
            })
            .catch(next);
    };

    static addTodo(req, res, next) {
        const { name, description, projectId } = req.body
        Todo.create({ name, description })
            .then((Todo) => {
                return Project.UpdateOne({ _id: projectId }, { $push: { todos: Todo._id } })
            })
            .then(updatedProject => res.json(updatedProject))
            .catch(next);
    };

    static delete(req, res, next) {
        const { projectId } = req.params
        Project.delete({
            _id: projectId
        })
            .then((deletedProject) => {
                res.status(200).json(deletedProject)
            })
            .catch(next);
    };

    static deleteTodo(req, res, next) {
        const { projectId } = req.params
        const { todoId } = req.query
        Project.update({ _id: projectId }, { $pull: { todos: todoId } })
            .then((Projects) => {
                res.status(200).json(Projects)
            })
            .catch(next);
    };

    static addMember(req, res, next) {
        const { projectId } = req.params
        const { userId } = req.query
        Project.updateOne({ _id: projectId }, { $push: { projectMembers: userId } })
            .then((addedMember) => {
                res.status(200).json(addedMember)
            })
            .catch(next);
    };

    static removeMember(req, res, next) {
        const { projectId } = req.params
        const { userId } = req.query
        Project.updateOne({ _id: projectId }, { $pull: { projectMembers: userId } })
            .then((deletedMember) => {
                res.status(200).json(deletedMember)
            })
            .catch(next);
    };
};

module.exports = ProjectController