const express = require("express");
const joi = require("joi");
const { Subscription } = require("../models/newsLetter");


const router = express.Router();

router.post("/", async (req, res) => {
    const schema = joi.object({
         email: joi.string().min(5).max(200).required().email(),
    })

    const { error } = schema.validate(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    const  {email} = req.body

    let subscriber = await Subscription.findOne({ email: email });
    
    if (subscriber) return res.status(400).send("email already subscribed...");

    subscriber = new Subscription({
        email:email
    })

    subscriber = await subscriber.save();

    res.send("Subscribed successfully")
})


module.exports=router