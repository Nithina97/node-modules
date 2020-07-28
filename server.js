const express = require("express");
const mongoose = require("mongoose");
const exphbs  = require('express-handlebars');
const app = express();

/*===================MIDDLEWEAR STARTS HERE=====================*/

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');




/*===================ENDS MIDDLEWEAR BLOCK=====================*/

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
    res.render("./home.handlebars");
  });


//listen port

let port = 5000;
app.listen(port , (err) => {
    if (err) throw err ;
    console.log("express server is running on port number" + port);
})