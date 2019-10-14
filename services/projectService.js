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

module.exports.update = (alias,bodyData) => {
    return new Promise((resolve, reject) => {
        Project.findOneAndUpdate({alias: alias},{$set :bodyData, $inc:{"__v": 1}},{new: true}).then(dt => {
            resolve(dt);                                        // we have define it with new true becoz the inc doesnt provides us the update value. find
        }).catch(err => reject(err))
    })
}
