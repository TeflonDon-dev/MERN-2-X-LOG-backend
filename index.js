const mongoose = require("mongoose")
const cors = require("cors")
const express = require("express");
const login = require("./routes/login");
const signup = require("./routes/signup");
const subscription = require("./routes/subscription");
const { productModel } = require("./models/product");
const Stripe = require("stripe");


require("dotenv").config();

const app = express();

app.use(cors());

app.use(express.json({ limit: "10mb" }));




app.use("/login", login);

app.use("/signup", signup);

app.use("/subscription", subscription);

app.post("/uploadproduct", async (req, res) => {
    const data = productModel(req.body);
    const saveData = await data.save();
    res.send({ message: "uploaded successfully..." });
})


app.get("/product", async(req, res) => {
    const data = await productModel.find({})
    res.send(JSON.stringify(data));
})

app.get("/",(req, res)=> {
    res.send("welcome to the server!")
})

// payment gateway

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.post("/checkout-payment", async (req, res) => {
    
    try {
        const params = {
            submit_type: "pay",
            mode: "payment",
            payment_method_types: ['card'],
            billing_address_collection: 'auto',
            shipping_options: [{ shipping_rate: "shr_1NiDqSCxp6HsbLJiMRxHRIuN" }],
            
               line_items : req.body.map((item)=>{
            return{
              price_data : {
                currency : "usd",
                product_data : {
                  name : item.name,
                //   images : [item.image]
                },
                unit_amount : item.price * 100,
              },
              adjustable_quantity : {
                enabled : true,
                minimum : 1,
              },
              quantity : item.cartQuantity
            }
               }),
               success_url:`${process.env.FRONTEND_URL}/success`,
           cancel_url:`${process.env.FRONTEND_URL}/cancel`
        }
         const session = await stripe.checkout.sessions.create(params)
        res.status(200).json(session.id)
    } catch (error) {
         res.status(error.statusCode||500).json(error.message)
    }
})



const PORT = process.env.port || 5000;

const uri = process.env.MONGODB_URL;


mongoose.connect(uri)
.then(() => console.log("connected to the database"))
.catch(err=>console.log(`Connection failed, ${err.message}`))

app.listen(PORT,console.log(`server running on ${PORT}`))

