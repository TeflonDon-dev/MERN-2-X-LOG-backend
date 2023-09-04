const bcrypt = require("bcrypt");
const joi = require("joi");
const express = require("express");
const { User } = require("../models/user");
const genAuthToken = require("../utils/genAuthToken");


const router = express.Router();

router.post("/", async (req, res) => {
    const schema = joi.object({
        firstname: joi.string().min(5).max(30).required(),
        lastname: joi.string().min(5).max(30).required(),
        email: joi.string().min(5).max(200).required().email(),
        password: joi.string().min(5).max(200).required(),
        confirmpassword: joi.string().min(5).max(200).required(),
        image: joi.string()

    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { email, firstname, lastname, password, confirmpassword,image } = req.body

    let user = await User.findOne({ email: email });
    
    if (user) return res.status(400).send("user already exists...");

    user = new User({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
        confirmpassword: confirmpassword,
        image:image
    });

    let salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(user.password, salt);
    user.confirmpassword = await bcrypt.hash(user.confirmpassword, salt);

    user = await user.save();

    const token = genAuthToken(user);

    res.send(token);


});

module.exports = router;