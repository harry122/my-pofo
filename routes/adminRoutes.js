const router = require("express").Router();

const MongoClient = require("mongodb").MongoClient;

const dbUrl = "mongodb://localhost:27017";

let db;

MongoClient.connect(dbUrl,{useNewUrlParser:true, useUnifiedTopology: true}, function(err,client){
    if(err){
        console.log("Error Connected to DB: ",err);
    } else {
        console.log(" Connected to Database Server");
        db = client.db('mypofo-app');
    }
})

router.get('/dashboard', (req,res) => {
    res.render('admin/dashboard', {
        title : 'Dashboard',
        layout: 'layout-admin'
    });
});

router.get("/projects", (req,res) => {

    let projectCollection = db.collection("project");
    projectCollection.find().toArray(function(err,projects) {
        if(err) {
            console.log(err)
        } else {
        res.render("admin/projects", {
        title:"Project-list",
        layout: "layout-admin",
        navProject : true,
        projects : projects,
    })
}
})
})


router.get("/projects/create", (req,res) => {
    res.render("admin/createProject",{
        title: "Create-Project",
        layout: "layout-admin"
    })
});

router.post("/projects/create", (req,res) => {
    let bodyData = req.body;
    console.log(bodyData);
    
    let projectCollection = db.collection('project');

    projectCollection.insertOne(bodyData, function(err,data) {
        if(err) {
            console.log(err);
        } else {
            console.log(data);
            res.redirect("/admin/projects");
        }
    });
})

router.get("/projects/:alias", (req,res) => {
    let alias = req.params.alias;
    let index = data.projectIndex[alias];
    res.render("admin/projectDetail", {
        title: "Project-detail",
        layout:"layout-admin",
        project : data.myProjects[index],
    })
});

module.exports = router;