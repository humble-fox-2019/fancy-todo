module.exports = (fieldName, modelName) => modelName.findOne({ fieldName }).then((result) => result ? false : true)
