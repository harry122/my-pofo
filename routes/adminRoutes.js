const router = require("express").Router();
const Projects = require("../models/projectSchema");
const ProjectService = require("../services/projectService");

router.get('/dashboard', (req, res) => {
    res.render('admin/dashboard', {
        title: 'Dashboard',
        layout: 'layout-admin'
    });
});

router.get("/projects", (req, res) => {

    //     Projects.find().then(projects => {
    //         console.log(projects);
    //     res.render("admin/projects", {
    //         title:"Project-list",
    //         layout: "layout-admin",
    //         navProject : true,
    //         projects : projects
    // })
    //     }).catch(err => next(err));

    // ProjectService.projectList(function (err, data) {
    //     if (err) {
    //         next(err)
    //     } else {
    //         res.render("admin/projects", {
    //             title: "Project-list",
    //             layout: "layout-admin",
    //             navProject: true,
    //             projects: data
    //         })

    //     }
    // })

    ProjectService.projectList()
    .then(data =>{
        res.render("admin/projects", {
            title: "Project-list",
            layout: "layout-admin",
            navProject: true,
            projects: data
    })
    }).catch(err => next(err));
})


router.get("/projects/create", (req, res) => {
    res.render("admin/createProject", {
        title: "Create-Project",
        layout: "layout-admin"
    })
});

router.post("/projects/create", (req, res, next) => {
    let bodyData = req.body;

    bodyData.alias = bodyData.name.split(" ").join("-").toLowerCase();
    let tagsArray = bodyData.tags.split(",");
    let classes = ['primary','secondary','danger','success'];

    let ft = [];

    tagsArray.forEach((ele,i) => {
        let dt = {
            name : ele,
            class : classes[i]
        }
        ft.push(dt)
    });

    bodyData.tags = ft || [];

    let newProject = new Projects(bodyData);
    console.log(newProject);
    newProject.save().then(data => {
        console.log(data);
        res.redirect('/admin/projects')
    }).catch(err => next(err));
})

router.get("/projects/:alias", (req,res,next) => {
    let alias = req.params.alias;
    ProjectService.getProject(alias).then(project => {
        res.render("admin/projectDetail", {
            title: "Project-detail",
            layout: "layout-admin",
            project: project,
        })
    }).catch(err => next(err))
   
});


router.get("/projects/:alias/delete",(req,res,next) => {
    let alias = req.params.alias;

    ProjectService.deleteProject(alias).then(dt => {
        res.redirect("/admin/projects")
    }).catch(err => next(err))

})


module.exports = router;