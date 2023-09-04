const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: String,
    category: String,
    image: String,
    price: String,
    description: String,
});

const productModel = mongoose.model("product", productSchema);

exports.productModel=productModel
