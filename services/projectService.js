const Project = require('../models/projectSchema');

module.exports.projectList = () => {
  return new Promise((resolve, reject) => {
    Project.find().then(data => {
        resolve(data)
    }).catch(err => reject(err))
    })
}

module.exports.getProject = (alias) => {
    return new Promise((resolve,reject) =>{
        Project.findOne({alias:alias}).then(dt => {
            resolve(dt)
        }).catch(err => reject(err))
    })
}


module.exports.deleteProject = (alias) => {
    return new Promise((resolve,reject) => {
        Project.findOneAndDelete({alias:alias}).then(dt => {
            resolve(dt)
        }).catch(err => reject(err))
    })
}