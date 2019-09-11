const Project = require('../models/project');

class ProjectController {

    static create(req, res, next) {
        const member = req.decode.id || req.decode._id;
        const { title, description } = req.body;
        Project.create({
            title,
            description,
        })
            .then(project => {
                return Project.findByIdAndUpdate({
                    _id: project._id
                }, {
                        $push: {
                            members: member
                        }
                    }, {
                        new: true
                    })

            })
            .then(project => {
                res.status(201).json(project);
            })
            .catch(next)
    }

    static readAll(req, res, next) {
        const member = req.decode._id || req.decode.id;
        Project.find({
            members: member
        })
            .then(projects => {
                res.status(200).json(projects);
            })
            .catch(next)
    }

    static readOne(req, res, next) {
        const _id = req.params.id;
        Project.findById({
            _id
        })
        .populate('members')
            .then(project => {
                res.status(200).json(project);
            })
            .catch(next)
    }

    static delete(req, res, next) {
        const _id = req.params.id;
        console.log(_id);
        Project.findByIdAndDelete({
            _id
        })
            .then(() => {
                res.status(200).json()
            })
            .catch(next)


    }

    static addMember(req, res, next) {
        const _id = req.params.id;
        const { member } = req.body;
        Project.findByIdAndUpdate({
            _id
        }, {
                $push: {
                    members: member
                }
            }, {
                new: true
            })
            .then(project => {
                res.status(201).json(project);
            })
            .catch(next)
    }

}

module.exports = ProjectController;