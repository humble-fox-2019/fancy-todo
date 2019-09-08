const Project = require('../models/project');
const User = require('../models/user');

class ProjectController {
    static getUserProject(req, res, next) {
        Project.find(
            { 'members': req.decode.id }
        )
            .populate('todos')
            .populate('members')
            .then(projects => {
                if (projects.length > 0) {
                    res.status(200).json(projects);
                } else {
                    next({ statusCode: 404 });
                }
            }).catch(next);
    }

    static store(req, res, next) {
        const { name, description } = req.body;
        let members = [req.decode.id];
        let createdBy = req.decode.id;
        Project.create(
            { name, description, members, createdBy }
        ).then(project => {
            res.status(201).json(project)
        }).catch(next);
    }

    static findOne(req, res, next) {
        Project.findOne({
            _id: req.params.id
        })
            .populate('todos')
            .populate('members')
            .then(project => {
                if (project) {
                    res.status(200).json(project);
                } else {
                    next({ statusCode: 404 });
                }
            }).catch(next);
    }

    static update(req, res, next) {
        const { name, description } = req.body;
        const data = { name, description };

        Project.updateOne({ _id: req.params.id }, data, { omitUndefined: true })
            .then((info) => {
                res.status(201).json({ message: 'successfully updated', data: info });
            })
            .catch(next);
    }

    static delete(req, res, next) {
        Project.findByIdAndDelete(req.params.id)
            .populate('todos')
            .populate('members')
            .then(data => {
                res.status(200).json({ message: 'successfully deleted', data });
            })
            .catch(next);
    }

    static invite(req, res, next) {
        Project.findOne(
            {
                _id: req.params.id,
                'members': req.body.userId
            }
        ).then(member => {
            if (member) {
                throw next({ statusCode: 401, msg: 'The user has been join this project.' });
            } else {
                return User.findOne({
                    _id: req.body.userId
                });
            }
        }).then(user => {
            if (user) {
                return Project.updateOne({ _id: req.params.id }, { $push: { members: req.body.userId } }, { omitUndefined: true });
            } else {
                throw next({ statusCode: 404, msg: 'The user no longer exists.' });
            }
        }).then((info) => {
            res.status(201).json({ message: 'User has been invited', data: info });
        }).catch(next);
    }

    static leave(req, res, next) {
        Project.findOne(
            {
                _id: req.params.id,
                'members': req.body.userId
            }
        ).then(member => {
            if (member) {
                return Project.updateOne({ _id: req.params.id }, { $pull: { members: req.body.userId } }, { omitUndefined: true });
            } else {
                throw next({ statusCode: 401, msg: 'The user not in this project' });
            }
        }).then((info) => {
            res.status(200).json({ message: 'successfully leave project', data: info });
        }).catch(next);
    }

    // static accept(req, res, next) {
    //     res.status(200).json({
    //         "message": 'ok'
    //     });
    // }

    // static decline(req, res, next) {
    //     res.status(200).json({
    //         "message": 'ok'
    //     });
    // }
}

module.exports = ProjectController