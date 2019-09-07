const Project = require('../models/project');

class ProjectController {
    static findAll(req, res, next) {
        res.status(200).json({
            "message": 'ok'
        });
    }

    static findOne(req, res, next) {
        res.status(200).json({
            "message": 'ok'
        });
    }

    static store(req, res, next) {
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