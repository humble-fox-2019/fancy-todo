const Project = require('../models/project');

class ProjectController {
    static getUserProject(req, res, next) {
        Project.find({})
            .then(projects => {
                res.status(200).json(projects)
            })
            .catch(err => {
                res.status(500).json(err)
            });
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
        res.status(200).json({
            "message": 'ok'
        });
    }

    static update(req, res, next) {
        res.status(200).json({
            "message": 'ok'
        });
    }

    static delete(req, res, next) {
        res.status(200).json({
            "message": 'ok'
        });
    }

    static invite(req, res, next) {
        res.status(200).json({
            "message": 'ok'
        });
    }

    static accept(req, res, next) {
        res.status(200).json({
            "message": 'ok'
        });
    }

    static decline(req, res, next) {
        res.status(200).json({
            "message": 'ok'
        });
    }

    static leave(req, res, next) {
        res.status(200).json({
            "message": 'ok'
        });
    }
}

module.exports = ProjectController