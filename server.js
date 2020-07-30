const express = require("express");
const mongoose = require("mongoose");
const exphbs  = require('express-handlebars');
const bodyParser = require("body-parser");
const { error } = require("jquery");
const app = express();

//import profile schema
require("./Model/Profile");
let Profile = mongoose.model("profile");

/*===================MIDDLEWEAR STARTS HERE=====================*/

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
//bodyparser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




/*===================ENDS MIDDLEWEAR BLOCK=====================*/

/*===================SERVE STATIC ASSETS======================*/
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/node_modules"));

/*===============ENDS STATIC ASSETS HERE=================================*/

//connect database

let mongodb_url =
"mongodb+srv://nithinakvr:nithinakvr@cluster0.kfpgj.mongodb.net/nithinakvr?retryWrites=true&w=majority";
mongoose.connect(
    mongodb_url,
    {
        useUnifiedtopology: true,
        useNewUrlParser: true,
    } ,
    (err) =>{
    if (err) throw err;
    console.log("database connected!");
}
);

//how to create express web server

//basic route
app.get("/", (req, res) => {
    //fetch data from database
    Profile.find({}).lean().then(profile =>{
        res.render("./home" , {profile})
    }).catch(err => console.log(err))
    
  });

  /*===============ALL GET REQUEST ====================*/
  app.get("/login" , (req,res) => {
      res.render("./auth/login");
  });
  app.get("/register" , (req,res) => {
    res.render("./auth/register");
});

app.get("/add-profile" , (req, res) => {
    res.render("./profiles/addprofile-form");
});

/*===============ALL GET REQUEST ENDS HERE====================*/

/*================ALL POST REQUEST CODE STARTS HERE==========================*/
app.post("/create-profile" , (req,res) => {
    const { firstname , lastname , phone} = req.body;
    let errors = [];
    if(!firstname){
        errors.push({text:"Firstname is Required"})    
    }
    if(!lastname){
        errors.push({text:"Lastname is Required"})   
    }
    if(!phone){
        errors.push({text:"Phone is Required"})   
    }
    if(errors.length > 0) {
        res.render("./profiles/addprofile-form" , {
            errors,
            firstname,
            lastname,
            phone,
        });
    }else{
        let newProfiles = {
            firstname,
            lastname,
            phone,
        };
        //store into database
        new Profile(newProfiles)
        .save()
        .then((profile) => {
            res.redirect("/" , 201, {profile });
        })
        .catch((err) => console.log(err));
       
    }
});

/*===============ALL POST REQUEST CODE ENDS HERE====================*/
//listen port

let port = 5000;
app.listen(port , (err) => {
    if (err) throw err ;
    console.log("express server is running on port number" + port);
})