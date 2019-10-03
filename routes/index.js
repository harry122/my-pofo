const data = require('../data');

module.exports.index = function(req,res) {
   res.render("index", {
        title: "myPortfolio- harish Mehra",
        layout : "index-layout"
    });
};

module.exports.projectList = function(req,res) {
    res.render("project-list", {
        title:"Project-List",
        navProject: true,
        projects : data.myProjects,
    })
};

module.exports.projectDetails = function(req,res) {

    let alias = req.params.alias;
    let index = data.projectIndex[alias];
    console.log(alias);
    res.render("project-detail", {
        title: "Project-Detail",
        navProject: true,
        project : data.myProjects[index],
    });
};

module.exports.blog = function(req,res) {
    res.render("blog", {
    title : "My-blog",
    navBlog : true,
    projects : data.myBlog,
    });
};

module.exports.blogDetails = function(req,res) {
    let alias = req.params.alias;
    console.log(alias);
    res.render("building-a-static-portfolio-site-using-bootstrap-", {
    title : "My-blog",
    navBlog : true,
    });
};

module.exports.about = function(req,res) {
    res.render("about", {
        title: "About"
    });
}

module.exports.getLogin = function(req,res) {
    res.render("login",{
        title:"Login",
        layout:"signin-layout",
    });
};

const users = [{name:'Harry',email:'test@test.com', password:'test'}, {email:'hello@test.com', password:'1234'}]

module.exports.doLogin = function(req,res) {
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
   
};

module.exports.getSignup = function(req,res) {
    res.render('signup', {
        title:"Create an account",
        layout:"signin-layout",
    });
}

module.exports.doSignup = function(req,res) {
    let body = req.body;
    console.log(body);
    res.redirect("/login");
}

module.exports.dashboard = function(req,res) {
    res.render('admin/dashboard', {
        title : 'Dashboard',
        layout: 'layout-admin'
    });
}

module.exports.contact = function(req,res) {
    res.render('contact',{
        title:"Contact Us",
        navContact: true,
    });
}

 module.exports.doContact = (req,res) => {
     let body = req.body;
    if(body.name == '') {
        res.status(400).json({"message" : 'Name Field is Requried'});
    } else {
        res.json({"message" : "contact sumitted successfully"});
    }

    }

module.exports.logout = (req,res) => {
    req.session.isLoggedIn = false;
    req.session.user = "";
    res.redirect("/login");
}
 
module.exports.adminProjects = (req,res) => {
    res.render("admin/projects", {
        title:"Project-list",
        layout: "layout-admin",
        projects : data.myProjects,
    })
}

module.exports.adminProjectDetail = (req,res) => {
    let alias = req.params.alias;
    let index = data.projectIndex[alias];
    res.render("admin/projectDetail", {
        title: "Project-detail",
        layout:"layout-admin",
        project : data.myProjects[index],
    })
}

module.exports.downloadResume = (req,res) =>{
    var path = "/Harish_mehra.pdf";
    fs.readFile(__dirname + path , function (err,data){
        res.contentType("application/pdf");
        res.send(data);
    });
}