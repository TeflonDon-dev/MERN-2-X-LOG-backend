const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 30
        
    },
    lastname: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 30
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength:200
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024,
    },
    confirmpassword: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024,
    },
    image: String
    
})

const User = mongoose.model("User", userSchema);

exports.User = User;