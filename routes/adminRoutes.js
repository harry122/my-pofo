const router = require("express").Router();
const Projects = require("../models/projectSchema");
const ProjectService = require("../services/projectService");
const UploadService = require('../services/upload')
const multer = require("multer");
const path = require("path");
const fs = require('fs');
const unzip = require('unzip');

let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, "../static/images/projects"))
    },
    filename: function (req,file,cb) {
        cb(null,file.originalname)
    }
})

let upload = multer({storage: storage});


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

router.post("/projects/:alias/update",(req,res,next) => {
    let bodyData = req.body;
    let alias = req.params.alias;
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
    ProjectService.update(alias,bodyData).then(dt => {
    res.redirect("/admin/projects");
    }).catch(err =>next(err))
    
})

router.get("/projects/:alias/upload-img",(req,res) => {
    let alias = req.params.alias;
    res.render("admin/upload",{
        title: "Upload-Image",
        layout: "layout-admin",
        actionUrl : `/admin/projects/${alias}/upload-img`
    })
})

router.post("/projects/:alias/upload-img", upload.single("img"),(req,res) => {
    console.log(req.file);
    let alias = req.params.alias;
    ProjectService.update(alias,{image: `/images/projects/${req.file.filename}`}).then(dt => {
        res.redirect("/admin/projects");
    }).catch(err => next(err))
    })

  router.get("/projects/:alias/upload-demo",(req,res) => {
      let alias = req.params.alias;
      res.render("admin/upload",{
          title: "Upload-Image",
          layout: "layout-admin",
          actionUrl : `/admin/projects/${alias}/upload-demo`
      })
  })

router.post("/projects/:alias/upload-demo", (req,res,next) => {
    let filename = req.params.alias+'.zip';
    let dir = path.join(__dirname,`../static/project-demos/${req.params.alias}`);

    function uploaded(err,success) {
        if(err) {
            next(err);
        } else {
            let path = dir+"/"+filename;
            fs.createReadStream(path).pipe(unzip.Extract({path : dir}));
            fs.unlinkSync(path);
            res.redirect('/admin/projects');
        }
    }

    UploadService.uploadDemo(req,res,dir,filename,uploaded);
    
})


module.exports = router;