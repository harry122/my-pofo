const router = require("express").Router();
const projectService = require("../services/projectService")

router.get("/", function(req,res) {
    res.render("index", {
         title: "myPortfolio- harish Mehra",
         layout : "index-layout"
     });
 })

 router.get("/projects", function(req,res,next) {

    projectService.projectList().then(data => {
        res.render("project-list", {
            title:"Project-List",
            navProject: true,
            projects : data,
        })
    }).catch(err => next(err))

  
})


router.get("/projects/:alias", function(req,res,next) {

    let alias = req.params.alias;
    projectService.getProject(alias).then(dt => {
        res.render("project-detail", {
            title: "Project-Detail",
            navProject: true,
            project : dt
        })
    }).catch(err => next(err))

   
})


router.get("/projects/:alias/demo", function(req,res) {
    let alias = req.params.alias;
    projectService.getProject(alias).then(data => {
        res.render("demo", {
            title: "Project-detail",
            layout: "layout-demo",
            alias: alias,
        })
    }).catch(err => next(err))

})

router.get("/blog", function(req,res,next) {

    projectService.projectList().then(data =>{
        res.render("blog", {
            title : "My-blog",
            navBlog : true,
            projects : data,
            })
    }).catch(err => next(err))

    
})

router.get("/blog/:alias", function(req,res) {
    let alias = req.params.alias;
    console.log(alias);
    res.render("building-a-static-portfolio-site-using-bootstrap-", {
    title : "My-blog",
    navBlog : true,
    });
})


router.get("/about", function(req,res) {
    res.render("about", {
        title: "About"
    });
})

router.get("/login", function(req,res) {
    res.render("login",{
        title:"Login",
        layout:"signin-layout",
    });
})


const users = [{name:'Harry',email:'test@test.com', password:'test'}, {email:'hello@test.com', password:'1234'}]

router.post("/login", function(req,res) {
    let body = req.body;
    console.log(body);
    let usr = users.filter(ele => body.email == ele.email)[0];
    if(usr && usr.password == body.password) {
         req.session.user = usr;
         res.locals.user = usr;
        req.session.isLoggedIn = true;
        res.redirect("/admin/dashboard");
    } else {
       res.render("login", {
           title :'Login',
           layout: 'signin-layout',
           error: "User credientials is incorrect",
       });
    }
   
});

router.get("/signup", function(req,res) {
    res.render('signup', {
        title:"Create an account",
        layout:"signin-layout",
    });
})

router.post("/signup", function(req,res) {
    let body = req.body;
    console.log(body);
    res.redirect("/login");
})

router.get("/contact", function(req,res) {
    res.render('contact',{
        title:"Contact Us",
        navContact: true,
    });
})

router.post("/contact", (req,res) => {
    let body = req.body;
   if(body.name == '') {
       res.status(400).json({"message" : 'Name Field is Requried'});
   } else {
       res.json({"message" : "contact sumitted successfully"});
   }

   });

router.get("/logout", (req,res) => {
    req.session.isLoggedIn = false;
    req.session.user = "";
    res.redirect("/login");
});

module.exports = router;
