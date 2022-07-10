const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name: String,
    image: String,
    type: String,
    price: Number,
    special: Boolean,
    quantity: Number
})

module.exports = mongoose.model('food', schema);