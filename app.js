// express is a framework on top of nodejs.

const express = require("express");
const fs = require("fs");
const hbs = require("hbs");
const app = express();  // we will take instance of that
const middlewares = require("./middlewares/errorhandler");
const appMiddlewares = require("./middlewares/appMiddlewares");
const routes = require("./routes/index");
const session = require("express-session");
hbs.registerPartials(__dirname+"/views/partials");

app.set("view engine", 'hbs');
app.set('views',__dirname+"/views");

app.use(express.static(__dirname+"/static"));

app.use(session({                           // it will store a session object in our system memory ram.
    secret:'my secret',
    saveUninitialized :false,
    resave:false,
    cookie: {maxAge:20000}
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(appMiddlewares.logger);

app.use(appMiddlewares.authenticated);

app.get("/", routes.index);

app.get("/projects", routes.projectList);
app.get("/projects/:alias",routes.projectDetails);
app.get("/blog",routes.blog);
app.get("/about",routes.about);
app.get("/blog/:alias",routes.blogDetails);
app.get("/login",routes.getLogin);
app.post("/login",routes.doLogin);
app.get("/signup",routes.getSignup);
app.post("/signup",routes.doSignup);
app.get("/contact",routes.contact);
app.post("/contact",routes.doContact);

app.get('/admin/dashboard',appMiddlewares.authenticate,routes.dashboard);
app.get('/admin/projects',appMiddlewares.authenticate,routes.adminProjects);
app.get('/admin/projects/:alias',appMiddlewares.authenticate, routes.adminProjectDetail);

app.get("/logout",routes.logout);

app.get("/resume", routes.downloadResume);

app.use(middlewares.notFound);
app.use(middlewares.handleError);
app.listen(3000, ()=> console.log("Server Running at Port 3000"));