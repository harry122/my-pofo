const mongoose = require("mongoose");
const schema = mongoose.Schema;


const projectSchema = new schema({
    name : {
        type : String,
        required: true,
        validate : {
            validator : (n) => Promise.resolve(n.length >= 3),
            message : "Minimum Length of Name is 3",        }
    },
    alias : {
        type: String,
        required: true,
        unique : true,
    },
    image : String,
    description : String,
    githubUrl : {
        type: String,
        trim: true,
    },
    tags: [{
        name : String,
        class : String
    }],
    imageSlider : [String],
    relatedProjects : [{
        name : String,
        link : String
    }],
    createdOn : {type: Date,default: Date.now()},
    updatedOn : Date,
});

// exports instant of collection
module.exports = mongoose.model('projects', projectSchema);