const mongoose = require("mongoose");

const newsLetter = new mongoose.Schema({
    email:String 
    
});

const Subscription = mongoose.model("Subscription", newsLetter);

exports.Subscription = Subscription;