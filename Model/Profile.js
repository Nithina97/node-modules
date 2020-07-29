/*=========Profile Schema by using mongoose ===============*/
const mongoose = require("mongoose"); //loading mongoose
const Schema = mongoose.Schema; //init

// new Schema instance should create that should an object
const ProfileSchema = new Schema({
    //blueprint of database
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now,
    },
});