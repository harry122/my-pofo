// express is a framework on top of nodejs.

const express = require("express");
const fs = require("fs");
const hbs = require("hbs");
const mongoose = require("mongoose");
const app = express();  // we will take instance of that


mongoose.connect("mongodb://localhost:27017/mypofo-app",{useNewUrlParser:true,useUnifiedTopology:true})
        .then(d => console.log("connected with DB"))
        .catch(err => console.log("DB connection Error",err));

const middlewares = require("./middlewares/errorhandler");
const appMiddlewares = require("./middlewares/appMiddlewares");
const publicRoutes = require("./routes/index");
const adminRouter = require("./routes/adminRoutes");

const session = require("express-session");
hbs.registerPartials(__dirname+"/views/partials");

app.set("view engine", 'hbs');
app.set('views',__dirname+"/views");

app.use(express.static(__dirname+"/static"));

app.use(session({                           // it will store a session object in our system memory ram.
    secret:'my secret',
    saveUninitialized :false,
    resave:false,
    cookie: {maxAge:60000}
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(appMiddlewares.logger);

app.use(appMiddlewares.authenticated);


app.use("/", publicRoutes);

app.use('/admin',appMiddlewares.authenticate, adminRouter);

app.use(middlewares.notFound);
app.use(middlewares.handleError);
app.listen(3000, ()=> console.log("Server Running at Port 3000"));